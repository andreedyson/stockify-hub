"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InventoryCardType } from "@/types";
import { InventoriesProductCountType } from "@/types/server/product";

type TotalProductChartsProps = {
  productsData: InventoriesProductCountType[];
  inventoriesData: InventoryCardType[];
};

export function TotalProductsCharts({
  productsData,
  inventoriesData,
}: TotalProductChartsProps) {
  const chartData = productsData;

  const configData = inventoriesData.reduce(
    (acc, item) => ({
      ...acc,
      [item.name.slice(0, 3)]: {
        label: item.name,
        color: item.color,
      },
    }),
    {},
  );

  const chartConfig = configData satisfies ChartConfig;

  const maxProducts = Math.max(...productsData.map((data) => data.products));
  const ticks = Array.from(
    { length: Math.ceil(maxProducts / 5) + 1 },
    (_, i) => i * 5,
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="inventory"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="products"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          ticks={ticks}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="products" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
