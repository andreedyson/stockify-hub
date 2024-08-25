"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "@/constants";
import { getCategories } from "@/data/category-data";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { UserCategories } from "@/types/server/category";
import { productSchema } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackButton from "../navigations/BackButton";
import ProductFormSkeletons from "../skeletons/ProductFormSkeletons";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { SubmitButton } from "../SubmitButton";

function AddProductForm({ userId }: { userId: string }) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const { toast } = useToast();
  const { startUpload } = useUploadThing("productImage");

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      categoryId: "",
    },
  });

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<UserCategories>({
    queryFn: () => getCategories(userId),
    queryKey: ["category"],
  });

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

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setSubmitting(true);

    try {
      const blob = values.image;
      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url;
        }
      }

      const inventoryId = categories?.results.find(
        (category) => category.id === values.categoryId,
      )?.inventoryId;

      const res = await fetch(`${BASE_URL}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          price: values.price,
          stock: values.stock,
          description: values.description,
          image: values.image,
          categoryId: values.categoryId,
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
        setSubmitting(false);
        toast({
          title: "Success 🎉",
          description: data.message,
          variant: "success",
        });
        router.push("/products");
        router.refresh();
        form.reset();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  }

  if (isLoading)
    return (
      <div>
        <ProductFormSkeletons />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-md bg-accent p-6"
      >
        <div className="section-header">
          <BackButton className="flex items-center gap-2">
            <h4>Add a Product</h4>
          </BackButton>
        </div>
        <div className="max-w-[650px] space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="rounded-md">
                  <div className="space-y-3">
                    <p>Product Image</p>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="Product Image"
                        width={150}
                        height={150}
                        priority
                        className="size-32 object-cover"
                      />
                    ) : (
                      <Image
                        src={"/assets/placeholder-image.svg"}
                        alt="Product Image"
                        width={150}
                        height={150}
                        priority
                        className="h-24 w-32 object-cover"
                      />
                    )}
                  </div>
                </FormLabel>
                <FormControl className="text-base-semibold flex-1 text-gray-700 dark:text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Stuff 1"
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for this product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.results?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="font-semibold"
                        >
                          {category.name}
                          <span className="font-light">
                            {` (${category.inventoryName}) `}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Link href={"/products"} className="w-full border-card-foreground">
              <Button variant={"outline"} type="button" className="w-full">
                Cancel
              </Button>
            </Link>
            <SubmitButton
              isSubmitting={submitting}
              className="w-full bg-main-700 hover:bg-main-500 dark:text-foreground"
            >
              Add
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default AddProductForm;
