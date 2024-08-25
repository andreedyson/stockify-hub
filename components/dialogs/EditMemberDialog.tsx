"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Member } from "@/components//tables/members/inventory-members-columns";
import { SubmitButton } from "../SubmitButton";

type AddMemberProps = {
  userData: Member;
  onSubmitSuccess: () => void;
};

function EditMemberDialog({ userData, onSubmitSuccess }: AddMemberProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: userData.email,
      role: userData.role,
    },
  });

  async function onSubmit(values: z.infer<typeof addMemberSchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/member`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventoryId: userData.inventoryId,
          userId: userData.userId,
          role: values.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        onSubmitSuccess();
        toast({
          description: data.message,
          variant: "destructive",
        });
      } else {
        setSubmitting(false);
        onSubmitSuccess();
        toast({
          title: "Success 🎉",
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
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Edit member data</DialogTitle>
        <DialogDescription>
          Change role for this member in this inventory.
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
                    readOnly
                    className="read-only:bg-zinc-300 dark:read-only:bg-card/70"
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
                    defaultValue={userData.role}
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

          <DialogFooter>
            <SubmitButton
              isSubmitting={submitting}
              className="w-full bg-main-700 hover:bg-main-500 dark:text-foreground"
            >
              Edit Member
            </SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default EditMemberDialog;
