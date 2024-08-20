"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";
import { currencyFormatterIDR, formatDate } from "@/lib/utils";
import { TransactionsTableType } from "@/types/server/transaction";
import StatusBadge from "@/components/StatusBadge";

export const TransactionsColumns: ColumnDef<TransactionsTableType>[] = [
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => <div>{formatDate(row.original.date)}</div>,
  },
  {
    accessorKey: "product",
    enableSorting: false,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Product" />;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Quantity" />;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
    cell: ({ row }) => {
      return (
        <div className="font-bold">
          {currencyFormatterIDR(row.original.total)}
        </div>
      );
    },
  },
];
