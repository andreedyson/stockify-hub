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
import React from "react";
import { cn } from "@/lib/utils";
import { Package, PackageSearch } from "lucide-react";
import Image from "next/image";

type TotalProductChartsProps = {
  productsData: InventoriesProductCountType[];
  inventoriesData: InventoryCardType[];
  align?: "row" | "column";
};

export function TotalProductsCharts({
  productsData,
  inventoriesData,
  align = "column",
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

  const totalProducts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.products, 0);
  }, [chartData]);

  return (
    <>
      {chartData.length ? (
        <div
          className={cn(
            "space-y-4",
            align === "row" && "lg:items-center xl:flex",
          )}
        >
          <div className={cn("w-full", align === "row" && "xl:max-w-48")}>
            <div
              className={cn(
                "flex items-center justify-center gap-2 text-center",
                align === "row" && "lg:flex-col",
              )}
            >
              <p className="flex items-center gap-1 text-xl font-bold md:text-2xl">
                <PackageSearch size={24} />
                {totalProducts}
                <span className="text-sm text-desc">Products</span>
              </p>
              <p className="text-xl md:text-2xl">/</p>
              <p className="flex items-center gap-1 text-xl font-bold md:text-2xl">
                <Package size={24} />
                {totalProducts}
                <span className="text-sm text-desc">Inventories</span>
              </p>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="max-h-[300px] min-h-[200px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
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
                tickMargin={15}
                axisLine={false}
                ticks={ticks}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="products" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
          <Image
            src={"/assets/total-products-empty.svg"}
            width={150}
            height={150}
            alt="Total Products Empty"
            className="size-[80%] lg:size-[300px]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              No Products Found
            </h4>
            <p className="text-[10px] text-desc md:text-sm">
              Showing total products from each inventory that you are part of.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
