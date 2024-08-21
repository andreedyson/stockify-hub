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

import { CurrentInventoryMembers } from "@/types/server/inventory";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import DeleteMemberDialog from "../dialogs/DeleteMemberDialog";
import EditMemberDialog from "../dialogs/EditMemberDialog";

type MemberColumnProps = {
  columnData: CurrentInventoryMembers;
};

function ColumnAction({ columnData }: MemberColumnProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");

  const handleSubmitSuccess = () => {
    setOpenDialog(false);
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
          {columnData.currentUserRole === "OWNER" && (
            <DialogTrigger asChild onClick={() => setAction("edit")}>
              <DropdownMenuItem className="flex items-center gap-2">
                <Pencil className="h-4 w-4" /> Edit Member
              </DropdownMenuItem>
            </DialogTrigger>
          )}
          {columnData.currentUserRole !== "USER" && (
            <DialogTrigger asChild onClick={() => setAction("delete")}>
              <DropdownMenuItem className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" color="red" />
                Delete Member
              </DropdownMenuItem>
            </DialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
        {action === "delete" ? (
          <DeleteMemberDialog
            userData={columnData}
            onSubmitSuccess={handleSubmitSuccess}
          />
        ) : (
          <EditMemberDialog
            userData={columnData}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ColumnAction;
