"use client";

import { formatDate } from "@/utils/time/formatDate";
import { ColumnDef } from "@tanstack/react-table";

export type Order = {
  id: string;
  orderDate: string;
  totalAmount: string;
  employeeId: string;
  customerId: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const orderDate = row.getValue("orderDate") as string;
      return <span>{formatDate(orderDate)}</span>;
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer") as {
        firstName: string;
        lastName: string;
      };
      return (
        <span>
          {customer.firstName} {customer.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.getValue("employee") as {
        firstName: string;
        lastName: string;
      };
      return (
        <span>
          {employee.firstName} {employee.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
];
