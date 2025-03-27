import { verifySession } from "@/lib/dal";

export default async function DashboardPage() {
  const session = await verifySession();

  return <div>Dashboard Page</div>;
}
