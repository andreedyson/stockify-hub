"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Crown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/tables/data-table-colum-header";

export type Member = {
  id: string;
  photo: string;
  name: string;
  email: string;
  role: "USER" | "OWNER";
  joined?: Date;
};

export const InventoryMemberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <Image
          src={"/assets/profile-not-found.svg"}
          width={36}
          height={36}
          alt="Profile"
        />
      );
    },
  },
  {
    accessorKey: "name",
    enableColumnFilter: true,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "joined",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Joined" />;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex items-center gap-1 font-bold",
          row.original.role === "OWNER" &&
            "text-orange-500 dark:text-yellow-500",
        )}
      >
        {row.original.role === "OWNER" ? <Crown size={12} /> : ""}
        {row.original.role}{" "}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
