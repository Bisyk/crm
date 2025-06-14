"use client";
import { trpc } from "@/trpc/client";
import AddModal from "./add-modal";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function CustomersPage() {
  const { data, isLoading } = trpc.customer.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div>
          <AddModal>Add Customer</AddModal>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        fieldToSortBy="email"
      />
    </div>
  );
}
