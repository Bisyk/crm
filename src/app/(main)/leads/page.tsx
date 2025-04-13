import { trpc } from "@/trpc/server";
import { columns, Lead } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import AddModal from "./add-modal";

async function getData(): Promise<Lead[]> {
  return trpc.lead.getAll();
}

export default async function LeadsPage() {
  const data = await getData();

  console.log(data);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <AddModal />
      </div>
      <DataTable
        data={data}
        columns={columns}
      />
    </div>
  );
}
