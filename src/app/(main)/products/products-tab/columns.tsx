"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "./delete-dialog";
import { Trash } from "lucide-react";
import AddModal from "./add-modal";

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
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex gap-2">
          <DeleteDialog id={id}>
            <Trash />
          </DeleteDialog>
        </div>
      );
    },
  },
];
