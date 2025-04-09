"use client";

import { formatDate } from "@/utils/time/formatDate";
import { ColumnDef } from "@tanstack/react-table";

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return <span>{formatDate(createdAt)}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      return <span>{formatDate(updatedAt)}</span>;
    },
  },
];
