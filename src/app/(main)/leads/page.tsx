"use client";

import { columns, Lead } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import AddModal from "./add-modal";
import { trpc } from "@/trpc/client";
import Loader from "@/components/loader";

export default function LeadsPage() {
  const { data, isLoading } = trpc.lead.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <AddModal />
      </div>
      {data && (
        <DataTable
          data={data}
          columns={columns}
          fieldToSortBy="email"
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
}
