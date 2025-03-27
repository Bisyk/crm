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
    <div className="container mx-auto py-10">
      <AddModal />
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
