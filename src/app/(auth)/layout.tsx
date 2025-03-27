import { TRPCProvider } from "@/trpc/client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TRPCProvider>{children}</TRPCProvider>;
}
