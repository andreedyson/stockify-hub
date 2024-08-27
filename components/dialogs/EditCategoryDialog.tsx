"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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

import { Input } from "@/components/ui/input";
import { categorySchema } from "@/types/validations";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { BASE_URL } from "@/constants";
import { Category } from "@prisma/client";
import { SubmitButton } from "../SubmitButton";

type EditCategoryProps = {
  categoryData: Category;
  onSubmitSuccess: () => void;
};

function EditCategoryDialog({
  categoryData,
  onSubmitSuccess,
}: EditCategoryProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: categoryData.name,
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          categoryId: categoryData.id,
          inventoryId: categoryData.inventoryId,
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
    <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit an existing Category</DialogTitle>
        <DialogDescription>
          Edit this category detail on this inventory.
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
              {submitting ? "Editing" : "Edit Category"}
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default EditCategoryDialog;
