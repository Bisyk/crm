"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import AddModal from "./add-modal";
import { trpc } from "@/trpc/client";

export default function EmployeesPage() {
  const { data, isLoading } = trpc.employee.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div>
          <AddModal>Add Employee</AddModal>
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data}
        fieldToSortBy="email"
      />
    </div>
  );
}
