"use client";

import * as React from "react";
import {
  CircleDollarSign,
  Factory,
  Headset,
  LayoutDashboard,
  PackageSearch,
  Send,
  ShieldUser,
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

const itemsForEmployee = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Leads", url: "/leads", icon: Headset },
  { title: "Leads Pipeline", url: "leads-pipeline", icon: Factory },
  { title: "Orders", url: "/orders", icon: CircleDollarSign },
  { title: "Products", url: "/products", icon: PackageSearch },
  { title: "Campaigns", url: "/campaigns", icon: Send },
];

const itemsForAdmin = [...itemsForEmployee];
itemsForAdmin.push({ title: "Employees", url: "/employees", icon: ShieldUser });

export function AppSidebar({
  userInfo,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    id: string;
    type: "admin" | "employee";
    shop: {
      id: string;
      name: string;
    };
  };
}) {
  const data = {
    user: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      avatar: "https://avatars.githubusercontent.com/u/1403668?v=4",
    },
  };

  const items = userInfo.type === "admin" ? itemsForAdmin : itemsForEmployee;

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={[{ name: userInfo.shop.name }]} />
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
