"use client";

import { DataTable } from "@/components/ui/data-table";
import { trpc } from "@/trpc/client";
import { columns } from "./columns";
import AddModal from "./add-modal";

export default function BrandsTab() {
  const { data, isLoading } = trpc.brand.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <div className="w-full flex justify-start items center">
        <AddModal />
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
