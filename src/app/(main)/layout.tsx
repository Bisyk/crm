import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/dal";
import { TRPCProvider } from "@/trpc/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
}: React.PropsWithChildren<object>) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <TRPCProvider>
      <SidebarProvider>
        <AppSidebar userInfo={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TRPCProvider>
  );
}
