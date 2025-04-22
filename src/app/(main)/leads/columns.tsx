"use client";

import { ColumnDef } from "@tanstack/react-table";
import AddModal from "./add-modal";
import { Pencil, Trash } from "lucide-react";
import { formatDate } from "@/utils/time/formatDate";
import DeleteDialog from "./delete-dialog";

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  notes: string;
  stage: string;
  updatedAt: string;
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    sortingFn: "datetime",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      return <span>{formatDate(updatedAt)}</span>;
    },
  },
  {
    accessorKey: "leadInterests",
    header: "Interest",
    cell: ({ row }) => {
      const interests = row.getValue("leadInterests") as any[];
      console.log(interests);
      const totalAmount = interests.reduce((acc, i) => {
        return acc + i.quantity * Number(i.product.price);
      }, 0);

      return <span>{totalAmount}</span>;
    },
  },
  {
    accessorKey: "stage",
    header: "Stage",
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
