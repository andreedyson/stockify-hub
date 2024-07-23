"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { registerSchema } from "@/types/validations";
import { useState } from "react";
import { BASE_URL } from "@/constants";
import { useToast } from "../ui/use-toast";

function RegisterForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);

        toast({
          description: data.message,
          variant: "destructive",
        });
      } else {
        setSubmitting(false);
        toast({
          description: data.message,
          variant: "success",
        });
        form.reset();
      }
    } catch (error: any) {
      console.log(error);
      setSubmitting(false);
      throw new Error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-[480px]"
        >
          <section className="space-y-2">
            <h2 className="header-2">Create an account 📦</h2>
            <p className="text-desc">
              Fill out the form below to create your account and start managing
              your inventory with ease.
            </p>
          </section>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Andre Edyson"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default RegisterForm;
