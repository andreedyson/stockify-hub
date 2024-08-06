"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";
import ColumnAction from "@/components/tables/ColumnAction";

export type Member = {
  id: string;
  photo: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "OWNER";
  joined: Date;
  userId?: string;
  inventoryId?: string;
};

export const InventoryMemberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <div className="size-12">
          <Image
            src={row.original.photo}
            width={36}
            height={36}
            alt="Profile"
            className="size-10 rounded-full object-cover md:size-12"
          />
        </div>
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
    cell: ({ row }) => <div>{formatDate(row.original.joined)}</div>,
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
      const data = row.original;

      return (
        <>{data.role === "OWNER" ? null : <ColumnAction columnData={data} />}</>
      );
    },
  },
];
