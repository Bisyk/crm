"use client";

import { formatDate } from "@/utils/time/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import AddModal from "./add-modal";
import { Pencil, Trash } from "lucide-react";
import DeleteDialog from "./delete-dialog";

export type Order = {
  id: string;
  orderDate: string;
  totalAmount: string;
  employeeId: string;
  customerId: string;
  paymentStatus: string;
  deliveryStatus: string;
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
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus") as string;

      let bgColor;
      let textColor;

      if (paymentStatus === "paid") {
        bgColor = "bg-green-200";
        textColor = "text-green-900";
      }

      if (paymentStatus === "processing") {
        bgColor = "bg-yellow-200";
        textColor = "text-yellow-900";
      }

      if (paymentStatus === "pending") {
        bgColor = "bg-blue-200";
        textColor = "text-blue-900";
      }

      if (paymentStatus === "failed") {
        bgColor = "bg-red-200";
        textColor = "text-red-900";
      }

      if (paymentStatus === "refunded" || paymentStatus === "cancelled") {
        bgColor = "bg-gray-200";
        textColor = "text-gray-900";
      }

      return (
        <span
          className={`${bgColor} ${textColor} px-3 py-1 rounded-full font-semibold`}
        >
          {paymentStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => {
      const deliveryStatus = row.getValue("deliveryStatus") as string;

      let bgColor;
      let textColor;

      if (deliveryStatus === "processing") {
        bgColor = "bg-yellow-200";
        textColor = "text-yellow-900";
      }

      if (deliveryStatus === "packed") {
        bgColor = "bg-blue-200";
        textColor = "text-blue-900";
      }

      if (deliveryStatus === "shipped") {
        bgColor = "bg-purple-200";
        textColor = "text-purple-900";
      }

      if (deliveryStatus === "in_transit") {
        bgColor = "bg-orange-200";
        textColor = "text-orange-900";
      }

      if (deliveryStatus === "delivered") {
        bgColor = "bg-green-200";
        textColor = "text-green-900";
      }

      if (deliveryStatus === "returned") {
        bgColor = "bg-gray-200";
        textColor = "text-gray-900";
      }

      if (deliveryStatus === "cancelled") {
        bgColor = "bg-red-200";
        textColor = "text-red-900";
      }

      return (
        <span
          className={`${bgColor} ${textColor} px-3 py-1 rounded-full font-semibold`}
        >
          {deliveryStatus}
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
