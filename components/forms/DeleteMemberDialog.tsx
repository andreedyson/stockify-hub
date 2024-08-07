import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { BASE_URL } from "@/constants";
import { Member } from "@/components/tables/members/inventory-members-columns";

type DeleteInventoryProps = {
  userData: Member;
  onSubmitSuccess: () => void;
};

function DeleteMemberDialog({
  userData,
  onSubmitSuccess,
}: DeleteInventoryProps) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/member`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
          inventoryId: userData.inventoryId,
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
        onSubmitSuccess();
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
  };
  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          Deleting this user will remove their access from this inventory.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="justify-end">
        <DialogClose className="w-[100px] rounded-sm">Cancel</DialogClose>
        <Button
          disabled={submitting}
          onClick={handleDelete}
          className="w-[100px] rounded-sm bg-red-500 text-white duration-200 hover:bg-red-300"
        >
          {submitting ? "Deleting..." : "Continue"}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default DeleteMemberDialog;
