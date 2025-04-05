"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  },
];
