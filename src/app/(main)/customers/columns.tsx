"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Firs Name",
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
];
