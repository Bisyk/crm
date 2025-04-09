"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "./delete-dialog";
import { Pencil, Trash } from "lucide-react";
import AddModal from "./add-modal";
import { formatDate } from "@/utils/time/formatDate";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  imageUrl: string;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <div className="max-w-[35vmin] truncate">{description}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stockCount",
    header: "Stock",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
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
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex gap-2">
          <DeleteDialog id={id}>
            <Trash />
          </DeleteDialog>
          <AddModal id={id}>
            <Pencil />
          </AddModal>
        </div>
      );
    },
  },
];
