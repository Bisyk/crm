"use client";

import { formatDate } from "@/utils/time/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import AddModal from "./add-modal";
import { Pencil } from "lucide-react";

export type Order = {
  id: string;
  orderDate: string;
  totalAmount: string;
  employeeId: string;
  customerId: string;
  items: {
    id: string;
    quantity: number;
    price: string;
  }[];
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
    accessorKey: "items",
    header: "Total Amount",
    cell: ({ row }) => {
      const items = row.getValue("items") as {
        id: string;
        quantity: number;
        price: string;
      }[];

      const totalPrice = items.reduce((acc, item) => {
        return acc + item.quantity * parseFloat(item.price);
      }, 0);

      return <span>{totalPrice}</span>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div>
          <AddModal id={id}>
            <Pencil />
          </AddModal>
        </div>
      );
    },
  },
];
