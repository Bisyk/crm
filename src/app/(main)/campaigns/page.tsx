"use client";

import { DataTable } from "@/components/ui/data-table";
import { AddModal } from "./add-modal";
import { columns } from "./columns";
import { trpc } from "@/trpc/client";

export default function CampaignsPage() {
  const { data, isLoading } = trpc.campaign.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <AddModal>Add Campaign</AddModal>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        fieldToSortBy="name"
      />
    </div>
  );
}
