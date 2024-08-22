"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TransactionsTableType } from "@/types/server/transaction";
import EditTransactionDialog from "../dialogs/EditTransactionDialog";
import { useRouter } from "next/navigation";
import DeleteTransactionDialog from "../dialogs/DeleteTransactionDialog";

type TransactionColumnActionType = {
  columnData: TransactionsTableType;
};

function TransactionColumnAction({ columnData }: TransactionColumnActionType) {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");

  const router = useRouter();

  const handleSubmitSuccess = () => {
    setOpenDialog(false);
    router.refresh();
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columnData.currentUserRole !== "USER" && (
            <DialogTrigger asChild onClick={() => setAction("edit")}>
              <DropdownMenuItem className="flex items-center gap-2">
                <Pencil className="h-4 w-4" /> Edit Transaction
              </DropdownMenuItem>
            </DialogTrigger>
          )}
          {columnData.currentUserRole !== "USER" && (
            <DialogTrigger asChild onClick={() => setAction("delete")}>
              <DropdownMenuItem className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" color="red" />
                Delete Transaction
              </DropdownMenuItem>
            </DialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
        {action === "delete" ? (
          <DeleteTransactionDialog
            transactionData={columnData}
            onSubmitSuccess={handleSubmitSuccess}
          />
        ) : (
          <EditTransactionDialog
            transactionData={columnData}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TransactionColumnAction;
