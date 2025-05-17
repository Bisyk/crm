"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { useEffect, useState } from "react";

const chartConfig = {
  1: {
    label: "Laptops",
    color: "hsl(var(--chart-1))",
  },
  2: {
    label: "Phones",
    color: "hsl(var(--chart-2))",
  },
  3: {
    label: "Earphones",
    color: "hsl(var(--chart-3))",
  },
  4: {
    label: "Chargers",
    color: "hsl(var(--chart-4))",
  },
  5: {
    label: "Tablets",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function SalesByCategoryChart() {
  const { data, isPending, isError } = trpc.order.getByCategories.useQuery();
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, curr) => acc + curr.sales, 0);
      setTotalSales(total);
    }
  }, [data]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Sales Categories</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isError && <div>Failed to load data</div>}
        {isPending ? (
          <div className="h-full">
            <Loader />
          </div>
        ) : (
          data && (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data}
                  dataKey="sales"
                  nameKey="category"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalSales.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Sales
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          )
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
