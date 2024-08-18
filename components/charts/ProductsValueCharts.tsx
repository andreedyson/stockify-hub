"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProductsValueType } from "@/server/product";

type ProductsValueChartsType = {
  productsData: ProductsValueType[];
};

export function ProductsValueCharts({ productsData }: ProductsValueChartsType) {
  const chartData = productsData;

  const chartConfig = {
    inventory: {
      label: "Inventory",
      color: "hsl(var(--chart-3))",
    },
    value: {
      label: "Value",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="inventory"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="value"
          type="natural"
          stroke="var(--color-inventory)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-inventory)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
