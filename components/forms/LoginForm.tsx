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

import { loginSchema } from "@/types/validations";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

function LoginForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/");
    }
  }, [session, router]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setSubmitting(true);

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res?.ok) {
        setSubmitting(false);
        toast({
          title: "Invalid credentials provided",
          variant: "destructive",
        });
        setSubmitting(false);
      } else {
        setSubmitting(false);
        router.refresh();
        router.replace("/dashboard");
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:max-w-[380px]"
        >
          <section className="mb-2 space-y-2 text-center md:text-start">
            <Link
              href={"/"}
              className="mb-4 flex items-center gap-1 text-sm text-desc hover:text-slate-600"
            >
              <ArrowLeft size={16} />
              Return to Homepage
            </Link>
            <div>
              <h2 className="logo mb-3 text-3xl md:mb-6">StockifyHub</h2>
            </div>
            <h2 className="header-2">Welcome back!👋</h2>
            <p className="desc-2">
              Enter your credentials to access the application.
            </p>
          </section>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex items-center justify-center rounded-md border border-input dark:bg-zinc-700">
                  <Mail size={24} className="mx-2" />
                  <FormControl>
                    <Input
                      placeholder="user@mail.com"
                      {...field}
                      autoComplete="off"
                      className="rounded-l-none"
                    />
                  </FormControl>
                </div>
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
                <div className="relative flex items-center justify-center rounded-md border border-input dark:bg-zinc-700">
                  <Lock size={24} className="mx-2" />
                  <FormControl>
                    <Input
                      placeholder={showPassword ? "Your Password" : "******"}
                      {...field}
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      className="rounded-l-none"
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 cursor-pointer text-desc"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email SignIn Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="hover:bg-second mt-2 w-full bg-main-500 text-white"
          >
            {submitting ? "Logging In..." : "Login"}
          </Button>
          <div className="my-1 flex items-center gap-6">
            <div className="h-1 w-1/2 bg-primary/20 dark:bg-primary-foreground/80" />
            <div>OR</div>
            <div className="h-1 w-1/2 bg-primary/20 dark:bg-primary-foreground/80" />
          </div>

          {/* Google SignIn Button */}
          <div>
            <Button
              className="w-full bg-zinc-700 text-white hover:bg-zinc-500"
              onClick={(e: any) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              <Image
                src={"/assets/google.svg"}
                width={24}
                height={24}
                alt="Google"
                className="mr-2"
              />
              Sign in with Google
            </Button>
          </div>
          <Link href={"/register"} className="mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span className="font-semibold text-main-500 underline">
              Sign Up
            </span>
          </Link>
          <div className="mt-12 flex flex-col items-center gap-2 text-sm text-desc md:flex-row md:justify-between">
            <p>© 2024 StockifyHub</p>
            <Link href={"/"} className="font-semibold text-main-500">
              Admin
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
