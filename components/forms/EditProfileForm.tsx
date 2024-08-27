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

import { BASE_URL } from "@/constants";
import { useUser } from "@/hooks/useUserData";
import { useUploadThing } from "@/lib/uploadthing";
import { formatDate, isBase64Image } from "@/lib/utils";
import { EditProfileSchema } from "@/types/validations";
import { Mail, UserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Loader from "../ui/loader";
import { useToast } from "../ui/use-toast";
import { SubmitButton } from "../SubmitButton";

type EditProfileProps = {
  userId: string;
};

function EditProfileForm({ userId }: EditProfileProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const { toast } = useToast();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      fullname: "",
      email: "",
      profile_photo: "",
    },
  });

  const { data, isLoading } = useUser(userId);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data) {
      form.reset({
        fullname: data.user.fullname,
        email: data.user.email,
        profile_photo: data.user.image,
      });
    }
  }, [data, form]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return; // Return if there is no image

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    setSubmitting(true);

    try {
      const blob = values.profile_photo;
      const hasImageChanged = isBase64Image(blob as string);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.profile_photo = imgRes[0].url;
        }
      }

      const res = await fetch(`${BASE_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: values.fullname,
          email: values.email,
          image: values.profile_photo,
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
        router.push("/dashboard");
        router.refresh();
        mutate(`/api/user/${userId}`);
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
        className="flex flex-col justify-start gap-4"
      >
        <div className="flex flex-col gap-4 rounded-lg bg-accent px-8 py-10">
          <div>
            <h2 className="header-3 mb-3 font-semibold text-slate-700 dark:text-slate-300">
              Edit Your Personal Profile
            </h2>
          </div>
          {/* Edit Profile Photo */}
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex max-w-[500px] items-center gap-4">
                <FormLabel className="rounded-full border-2 border-input">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_photo"
                      width={150}
                      height={150}
                      priority
                      className="size-20 rounded-full object-cover md:size-[150px]"
                    />
                  ) : (
                    <Image
                      src={"/assets/profile-not-found.svg"}
                      alt="profile_photo"
                      width={150}
                      height={150}
                      priority
                      className="size-20 rounded-full object-cover md:size-[150px]"
                    />
                  )}
                </FormLabel>
                <FormControl className="text-base-semibold flex-1 text-gray-700 dark:text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Personal Info Card */}
            <div className="w-full space-y-4 rounded-md border-2 border-input bg-muted px-6 py-4 max-md:w-full lg:px-8 lg:py-6">
              <h3 className="text-lg font-bold text-slate-500 dark:text-slate-300 md:text-xl">
                Personal Info
              </h3>
              <div className="flex w-full flex-col gap-4 md:text-base">
                <div className="space-y-1 font-semibold">
                  <h4 className="desc-2 text-sm md:text-base">Full Name</h4>
                  <p className="text-sm md:text-base">{data.user.fullname}</p>
                </div>
                <div className="space-y-1 font-semibold">
                  <h4 className="desc-2 text-sm md:text-base">Email</h4>
                  <p className="text-sm md:text-base">{data.user.email}</p>
                </div>
                <div className="space-y-1 font-semibold">
                  <h4 className="desc-2 line-clamp-1 text-sm md:text-base">
                    Acccount Created
                  </h4>
                  <p className="text-sm md:text-base">
                    {formatDate(new Date(data.user.createdAt))}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-500 dark:text-slate-300 md:text-xl">
                Edit Personal Info
              </h3>
              <FormField
                control={form.control}
                name="fullname"
                defaultValue={data.user.fullname}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="flex max-w-[600px] items-center justify-center rounded-md border border-input dark:bg-zinc-700">
                      <UserRound size={24} className="mx-2" />
                      <FormControl>
                        <Input
                          placeholder="ex: Andre Edyson"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex max-w-[600px] items-center justify-center rounded-md border border-input dark:bg-zinc-700">
                      <Mail size={24} className="mx-2" />
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="user@mail.com"
                          {...field}
                          autoComplete="off"
                          className="rounded-l-none read-only:brightness-75"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton
                isSubmitting={submitting}
                className="mt-6 w-full max-w-[600px] bg-main-500 text-white hover:bg-main-400"
              >
                {submitting ? "Saving" : "Save Changes"}
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default EditProfileForm;
