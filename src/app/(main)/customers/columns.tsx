"use client";

import { ColumnDef } from "@tanstack/react-table";
import AddModal from "./add-modal";
import { Pencil, Trash } from "lucide-react";
import DeleteDialog from "./delete-dialog";

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex items-center gap-2">
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
