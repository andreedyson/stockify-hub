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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { addMemberSchema } from "@/types/validations";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { BASE_URL, userRole } from "@/constants";
import { UserCheck } from "lucide-react";

type AddMemberProps = {
  inventoryId: string;
};

function AddMemberDialog({ inventoryId }: AddMemberProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
      role: "USER",
    },
  });

  async function onSubmit(values: z.infer<typeof addMemberSchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          role: values.role,
          inventoryId: inventoryId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        toast({
          title: "😵 Uh oh! Something went wrong",
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
          className="flex items-center gap-2 bg-zinc-600 text-xs text-white duration-200 hover:bg-zinc-400 lg:text-sm"
        >
          <UserCheck className="text-sm lg:text-sm" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Member</DialogTitle>
          <DialogDescription>
            Grant access for a new member to this current inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@mail.com"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role for this user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userRole.map((role, i) => (
                          <SelectItem
                            key={i}
                            value={role.name}
                            className="font-semibold"
                          >
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="flex gap-2">
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
                {submitting ? "Adding..." : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddMemberDialog;
