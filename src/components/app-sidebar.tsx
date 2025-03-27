"use client";

import * as React from "react";
import {
  CircleDollarSign,
  Frame,
  Headset,
  LayoutDashboard,
  PackageSearch,
  Store,
  Users,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Leads", url: "/leads", icon: Headset },
  { title: "Orders", url: "/orders", icon: CircleDollarSign },
  { title: "Products", url: "/products", icon: PackageSearch },
];
export function AppSidebar({
  userInfo,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userInfo: {
    name: string;
    email: string;
    avatar: string;
    id: string;
  };
}) {
  const data = {
    shops: [{ name: "Shop", logo: Store, plan: "Free" }],
    user: {
      name: userInfo.name,
      email: userInfo.email,
      avatar: "https://avatars.githubusercontent.com/u/1403668?v=4",
    },
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.shops} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
