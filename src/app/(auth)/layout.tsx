import { getUser } from "@/lib/dal";
import { TRPCProvider } from "@/trpc/client";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user) {
    redirect("dashboard");
  }

  return <TRPCProvider>{children}</TRPCProvider>;
}
