"use client";

import { useState } from "react";

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
import { Category } from "@prisma/client";
import EditCategoryDialog from "../forms/EditCategoryDialog";
import DeleteCategoryDialog from "../forms/DeleteCategoryDialog";

type CategoryActionProps = {
  category: Category;
};

function CategoryAction({ category }: CategoryActionProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");

  const handleSubmitSuccess = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild onClick={() => setAction("edit")}>
            <DropdownMenuItem className="flex items-center gap-2">
              <Pencil className="h-4 w-4" /> Edit Category
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild onClick={() => setAction("delete")}>
            <DropdownMenuItem className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" color="red" />
              Delete Category
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
        {action === "delete" ? (
          <DeleteCategoryDialog
            categoryData={category}
            onSubmitSuccess={handleSubmitSuccess}
          />
        ) : (
          <EditCategoryDialog
            categoryData={category}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CategoryAction;
