"use client";

import * as React from "react";
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
const chartData = [
  { category: "laptops", sales: 275, fill: "var(--color-laptops)" },
  { category: "phones", sales: 200, fill: "var(--color-phones)" },
  { category: "earphones", sales: 287, fill: "var(--color-earphones)" },
  { category: "chargers", sales: 173, fill: "var(--color-chargers)" },
  { category: "tablets", sales: 190, fill: "var(--color-tablets)" },
];

const chartConfig = {
  laptops: {
    label: "Laptops",
    color: "hsl(var(--chart-1))",
  },
  phones: {
    label: "Phones",
    color: "hsl(var(--chart-2))",
  },
  earphones: {
    label: "Earphones",
    color: "hsl(var(--chart-3))",
  },
  chargers: {
    label: "Chargers",
    color: "hsl(var(--chart-4))",
  },
  tablets: {
    label: "Tablets",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function PieChartComponent() {
  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Sales Categories</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              data={chartData}
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
