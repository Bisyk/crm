"use client";

// import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { trpc } from "@/trpc/client";
import Loader from "./loader";

const chartConfig = {
  clients: {
    label: "Clients",
    color: "hsl(var(--chart-1))",
  },
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ClientsVsLeadsChart() {
  const { data, isLoading } = trpc.statistics.getClientsVsLeads.useQuery();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Clients vs Leads</CardTitle>
        <CardDescription>
          Showing total clients and leads for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <Loader />}
        {data && (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="clients"
                type="natural"
                fill="var(--color-clients)"
                fillOpacity={0.4}
                stroke="var(--color-clients)"
                stackId="a"
              />
              <Area
                dataKey="leads"
                type="natural"
                fill="var(--color-leads)"
                fillOpacity={0.4}
                stroke="var(--color-leads)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
        {!data && !isLoading && <div>Failed to load data</div>}
      </CardContent>
      <CardFooter>
        {/* <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
}
