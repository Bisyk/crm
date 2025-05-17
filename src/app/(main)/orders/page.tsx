"use client";

import { DataTable } from "@/components/ui/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "./columns";
import AddModal from "./add-modal";

export default function OrdersPage() {
  const { data, isLoading } = trpc.order.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div>
          <AddModal>Add Order</AddModal>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        isFilterable={false}
        isLoading={isLoading}
      />
    </div>
  );
}
