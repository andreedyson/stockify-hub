"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { BASE_URL, transactionStatus } from "@/constants";
import { transactionSchema } from "@/types/validations";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/data/product-data";
import { UserProducts } from "@/types/server/product";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { TransactionsTableType } from "@/types/server/transaction";

type TransactionFormProps = {
  transactionData: TransactionsTableType;
  onSubmitSuccess: () => void;
};

function EditTransactionDialog({
  transactionData,
  onSubmitSuccess,
}: TransactionFormProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<UserProducts>({
    queryKey: ["product"],
    queryFn: () => getProducts(transactionData.userId),
  });

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      productId: transactionData.productId,
      quantity: transactionData.quantity,
      date: new Date(transactionData.date),
      status: transactionData.status,
    },
  });

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/transaction`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: transactionData.id,
          productId: values.productId,
          quantity: values.quantity,
          status: values.status,
          date: values.date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        toast({
          title: "Uh oh! Something went wrong 😵",
          description: data.message,
          variant: "destructive",
        });
      } else {
        setSubmitting(false);
        toast({
          title: "Success 🎉",
          description: data.message,
          variant: "success",
        });
        onSubmitSuccess();
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit a Transaction</DialogTitle>
          <DialogDescription>
            Please fill in the following details to edit an existing
            transaction.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product for this transaction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products?.results.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id}
                            className="w-full font-semibold"
                          >
                            <div className="flex w-full items-center gap-2">
                              <p>{product.name}</p>
                              <p>({product.Inventory?.name})</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="w-fit">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "bg-input text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2019-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status for this transaction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionStatus.map((status) => (
                          <SelectItem
                            key={status.value}
                            value={status.value}
                            className="font-semibold"
                          >
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-main-700 hover:bg-main-500 dark:text-foreground"
              >
                {submitting ? "Editing..." : "Edit Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </div>
  );
}

export default EditTransactionDialog;
