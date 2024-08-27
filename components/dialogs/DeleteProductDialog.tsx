import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { BASE_URL } from "@/constants";
import { SubmitButton } from "../SubmitButton";

type DeleteProductDialog = {
  productId: string;
  onSubmitSuccess: () => void;
};

function DeleteProductDialog({
  productId,
  onSubmitSuccess,
}: DeleteProductDialog) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/product`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
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
          title: "🎉 Success",
          description: data.message,
          variant: "success",
        });
        onSubmitSuccess();
        router.refresh();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          Deleting this product will remove it&apos;s data from our server.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="justify-end">
        <DialogClose className="w-[100px] rounded-sm duration-200 hover:underline">
          Cancel
        </DialogClose>
        <SubmitButton
          onClick={handleDelete}
          isSubmitting={submitting}
          className="w-[100px] rounded-sm bg-red-500 text-white duration-200 hover:bg-red-300"
        >
          {submitting ? "Deleting" : "Delete"}
        </SubmitButton>
      </DialogFooter>
    </div>
  );
}

export default DeleteProductDialog;
