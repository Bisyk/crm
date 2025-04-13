import { trpc } from "@/trpc/server";
import { columns, Employee } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import AddModal from "./add-modal";

async function getData(): Promise<Employee[]> {
  return trpc.employee.getAll();
}

export default async function EmployeesPage() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <AddModal />
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
