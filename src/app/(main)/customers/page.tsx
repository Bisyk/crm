import { trpc } from "@/trpc/server";
import AddModal from "./add-modal";
import { Customer, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Customer[]> {
  return trpc.customer.getAll();
}

export default async function ClientsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <AddModal />
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
