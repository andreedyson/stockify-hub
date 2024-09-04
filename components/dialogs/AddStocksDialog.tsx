"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
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
import { Input } from "@/components/ui/input";
import { addStockSchema } from "@/types/validations";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { BASE_URL } from "@/constants";
import { SubmitButton } from "../SubmitButton";

type AddStocksDialogType = {
  userId: string;
  productId: string;
  onSubmitSuccess: () => void;
};

function AddStocksDialog({
  userId,
  productId,
  onSubmitSuccess,
}: AddStocksDialogType) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addStockSchema>>({
    resolver: zodResolver(addStockSchema),
    defaultValues: {
      stock: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof addStockSchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/product/add-stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          stock: values.stock,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);

        toast({
          title: "Uh oh! Something went wrong",
          description: data.message,
          variant: "destructive",
        });
      } else {
        onSubmitSuccess();
        setSubmitting(false);
        toast({
          title: "Success 🎉",
          description: data.message,
          variant: "success",
        });
        form.reset();
        router.refresh();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  }
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Add a stock</DialogTitle>
        <DialogDescription>
          Increase the quantity of a product in your inventory.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <SubmitButton
              isSubmitting={submitting}
              className="w-full bg-main-700 hover:bg-main-500 dark:text-foreground"
            >
              {submitting ? "Adding" : "Add"}
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default AddStocksDialog;
