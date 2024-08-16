"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InventoryCategoriesChartData } from "@/server/category";
import React from "react";

type InventoryCategoryChartsType = {
  categoryData: InventoryCategoriesChartData[];
};

export function InventoryCategoryCharts({
  categoryData,
}: InventoryCategoryChartsType) {
  // Define a list of colors or generate them dynamically
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const chartData = categoryData.map((category, index) => ({
    ...category,
    fill: colors[index % colors.length], // Cycle through colors
  }));

  const chartConfig = {
    Products: {
      label: "Products",
    },
    ...categoryData.reduce((acc, category, index) => {
      acc[category.Category] = {
        label: category.Category,
        color: colors[index % colors.length],
      };
      return acc;
    }, {} as ChartConfig),
  };

  const totalProducts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.Products, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[280px] min-h-[280px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend
          content={<ChartLegendContent className="flex flex-wrap" />}
        />
        <Pie
          data={chartData}
          dataKey="Products"
          nameKey="Category"
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
                      {totalProducts.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Products
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
