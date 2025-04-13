"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  notes: string;
  stage: string;
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
];
