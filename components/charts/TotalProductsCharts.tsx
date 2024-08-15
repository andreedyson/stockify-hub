"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { InventoriesProductCountType } from "@/server/product";
import { InventoryCardType } from "@/types";

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
      [item.name.slice(0, 3)]: { label: item.name, color: item.color },
    }),
    {},
  );

  const chartConfig = configData satisfies ChartConfig;

  const maxProducts = Math.max(...productsData.map((data) => data.Products));
  const ticks = Array.from(
    { length: Math.ceil(maxProducts / 5) + 1 },
    (_, i) => i * 5,
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="Inventory"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="Products"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          ticks={ticks}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="Products" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
