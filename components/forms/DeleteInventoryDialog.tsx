import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { BASE_URL } from "@/constants";

type DeleteInventoryProps = {
  userId: string;
  inventoryId: string;
};

function DeleteInventoryDialog({ userId, inventoryId }: DeleteInventoryProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/inventory`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, inventoryId: inventoryId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        toast({
          description: data.message,
          variant: "destructive",
        });
      } else {
        setOpenDialog(false);
        setSubmitting(false);
        toast({
          title: "🎉 Success",
          description: data.message,
          variant: "success",
        });
        router.push("/inventory");
        router.refresh();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  };
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[100px] border-red-500 text-red-500 duration-200 hover:bg-red-500 hover:text-white md:w-[120px]"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this inventory will permanently remove it from your
            records, member records, and our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"outline"}
            className="w-[100px] rounded-sm"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={submitting}
            onClick={handleDelete}
            className="w-[100px] rounded-sm bg-red-500 text-white duration-200 hover:bg-red-300"
          >
            {submitting ? "Deleting..." : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteInventoryDialog;
