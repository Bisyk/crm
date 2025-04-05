"use client";

import { DataTable } from "@/components/ui/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "./columns";
import AddModal from "./add-modal";

export default function BrandsTab() {
  const { data, error, isLoading } = trpc.brand.getAll.useQuery();

  return (
    <div>
      <div className="w-full flex justify-end mb-2">
        <AddModal />
      </div>
      {data && !isLoading && (
        <DataTable
          data={data}
          columns={columns}
          isFilterable={false}
        />
      )}
    </div>
  );
}
