"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LowStockProductsType } from "@/server/product";

type LowStockProductsChartsType = {
  productsData: LowStockProductsType[];
};

export function LowStocksProductsCharts({
  productsData,
}: LowStockProductsChartsType) {
  // Define a list of colors or generate them dynamically
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const chartData = productsData.map((product, index) => ({
    ...product,
    fill: colors[index % colors.length], // Cycle through colors
  }));

  const chartConfig = {
    name: {
      label: "Products",
    },
    ...productsData.reduce((acc, product, index) => {
      acc[product.name] = {
        label: product.name,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as ChartConfig),
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend
          content={<ChartLegendContent className="flex flex-wrap" />}
        />
        <Pie data={chartData} dataKey="stock" nameKey="name" innerRadius={50} />
      </PieChart>
    </ChartContainer>
  );
}
