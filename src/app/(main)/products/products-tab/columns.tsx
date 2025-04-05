"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Category Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
];
