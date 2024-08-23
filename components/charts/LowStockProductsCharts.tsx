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
import { LowStockProductsType } from "@/types/server/product";
import Image from "next/image";
import { ChartColumnDecreasing } from "lucide-react";

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
      {chartData.length ? (
        <div>
          <div className="flex w-full flex-col items-center space-y-2 text-center text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              <ChartColumnDecreasing color="red" className="size-4" />
              {chartData.length} {chartData.length > 1 ? "products" : "product"}{" "}
              are low on stocks
            </div>
            <div className="leading-none text-muted-foreground">
              Showing the products that have less than 5 stocks
            </div>
          </div>
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
              dataKey="stock"
              nameKey="name"
              innerRadius={50}
            />
          </PieChart>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
          <Image
            src={"/assets/pie-chart-empty.svg"}
            width={200}
            height={300}
            alt="Empty Low Stocks"
            className="size-[80%] lg:size-[300px]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              No Low Stocks Product Found
            </h4>
            <p className="text-[10px] text-desc md:text-sm">
              Your list of products from each inventory will show here.
            </p>
          </div>
        </div>
      )}
    </ChartContainer>
  );
}
