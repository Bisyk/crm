"use client";

import { formatDate } from "@/utils/time/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import AddModal from "./add-modal";
import { Pencil, Trash } from "lucide-react";
import DeleteDialog from "./delete-dialog";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  role: string;
  salary: number;
  hireDate: string;
};

export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => {
      const hireDate = row.getValue("hireDate") as string;
      return <span>{formatDate(hireDate)}</span>;
    },
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
