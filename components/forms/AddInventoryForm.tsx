"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { inventorySchema } from "@/types/validations";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { BASE_URL } from "@/constants";
import { PackageOpen } from "lucide-react";

function AddInventoryForm({ userId }: { userId: string }) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: "",
      color: "#000000",
    },
  });

  async function onSubmit(values: z.infer<typeof inventorySchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          name: values.name,
          color: values.color,
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
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-card-foreground"
        >
          <PackageOpen size={16} />
          Add Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Inventory</DialogTitle>
          <DialogDescription>
            Create a new inventory for you to track all your products.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Warehouse"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="flex">
              <DialogClose className="w-full">
                <Button
                  variant={"outline"}
                  type="button"
                  className="w-full border-card-foreground"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-main-700 hover:bg-main-500 dark:text-foreground"
              >
                {submitting ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddInventoryForm;
