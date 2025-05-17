import Dashboard from "@/components/dashboard";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await verifySession();

  if (!session) {
    redirect("/signup");
  }

  return <Dashboard />;
}
