"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import DeleteInventoryDialog from "./DeleteInventoryDialog";

type EditInventoryProps = {
  userId: string;
  inventoryData: {
    id: string;
    name: string;
    color: string | undefined;
  };
};

function EditInventoryForm({ userId, inventoryData }: EditInventoryProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: inventoryData.name,
      color: inventoryData.color,
    },
  });

  async function onSubmit(values: z.infer<typeof inventorySchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/inventory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          inventoryId: inventoryData.id,
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
        setSubmitting(false);
        toast({
          title: "🎉 Success",
          description: data.message,
          variant: "success",
        });
        router.refresh();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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

        <div className="mt-4 flex w-full justify-end gap-2">
          <DeleteInventoryDialog
            userId={userId}
            inventoryId={inventoryData.id}
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-[100px] bg-main-700 hover:bg-main-500 dark:text-foreground md:w-[120px]"
          >
            {submitting ? "Editing..." : "Edit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditInventoryForm;
