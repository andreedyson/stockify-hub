"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants";
import { categorySchema } from "@/types/validations";
import { Layers3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { SubmitButton } from "../SubmitButton";

type CategoryProps = {
  inventoryId: string;
};

function AddCategoryDialog({ inventoryId }: CategoryProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          inventoryId: inventoryId,
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
          size={"sm"}
          className="flex h-9 items-center gap-2 bg-main-700 px-3 text-xs text-white duration-200 hover:bg-main-500 xl:text-sm"
        >
          <Layers3 size={16} />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Category</DialogTitle>
          <DialogDescription>
            Add a new category to this current inventory.
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
                      placeholder="ex: Computer"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex gap-2">
              <SubmitButton
                isSubmitting={submitting}
                className="w-full bg-main-700 hover:bg-main-500 dark:text-foreground"
              >
                Add Category
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategoryDialog;
