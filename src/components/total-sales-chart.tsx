"use client";

import { Divide, TrendingUp } from "lucide-react";
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
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TotalSalesChart() {
  const { data, isPending, isError } = trpc.order.getByMonths.useQuery();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
        <CardDescription>
          Showing total sales for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        {isPending ? (
          <div className="h-full">
            <Loader />
          </div>
        ) : isError ? (
          <div>Failed to load</div>
        ) : data ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{ left: 12, right: 12 }}
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
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    hideLabel
                  />
                }
              />
              <Area
                dataKey="sales"
                type="linear"
                fill="var(--color-sales)"
                fillOpacity={0.4}
                stroke="var(--color-sales)"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div>No data available</div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            {/* <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
