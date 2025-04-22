"use client";
import AreaChartComponent from "@/components/area-chart";
import PieChartComponent from "@/components/pie-chart";
import AreaChartLinearComponent from "@/components/area-chart-linear";
import { DollarSign, Headset, PackageOpen, Users } from "lucide-react";
import InfoCard from "@/components/info-card";
import { trpc } from "@/trpc/client";
import { formatCurrency } from "@/utils/currency/formatCurrency";

export default function Dashboard() {
  const { data: totalCustomers } = trpc.customer.getTotalNumber.useQuery();
  const { data: totalLeads } = trpc.lead.getTotalNumber.useQuery();
  const { data: totalRevenue } = trpc.order.getTotalRevenue.useQuery();
  const { data: totalSales } = trpc.order.getTotalSales.useQuery();

  console.log(totalRevenue);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-xl">
          <InfoCard
            title="Total Revenue"
            value={totalRevenue ? `$ ${formatCurrency(totalRevenue)}` : "0"}
            secondary="+20.1% from last month"
            icon={<DollarSign />}
          />
        </div>
        <div className="bg-muted/50 rounded-xl">
          <InfoCard
            title="Total Sales"
            value={totalSales ?? "0"}
            secondary="+20.1% from last month"
            icon={<PackageOpen />}
          />
        </div>
        <div className="bg-muted/50 rounded-xl">
          <InfoCard
            title="Total Leads"
            value={totalLeads ?? "0"}
            secondary="+201 from last month"
            icon={<Headset />}
          />
        </div>
        <div className="bg-muted/50 rounded-xl">
          <InfoCard
            title="Total Customers"
            value={totalCustomers ?? "0"}
            secondary="+201 from last month"
            icon={<Users />}
          />
        </div>
      </div>
      <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
        <div className="bg-muted/50 h-full rounded-xl">
          <AreaChartComponent />
        </div>
        <div className="bg-muted/50 h-full rounded-xl">
          <AreaChartLinearComponent />
        </div>
        <div className="bg-muted/50 h-full rounded-xl">
          <PieChartComponent />
        </div>
      </div>
      <div className="bg-muted/50 flex-1 rounded-xl" />
    </div>
  );
}
