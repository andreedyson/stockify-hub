"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { currencyFormatterIDR } from "@/lib/utils";
import { ProductsValueType } from "@/types/server/product";
import { Banknote } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";

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

  const totalProductsValue =
    useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.value, 0);
    }, [chartData]) || 0;

  return (
    <>
      {chartData.length ? (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h5 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
              <Banknote size={32} />
              {currencyFormatterIDR(totalProductsValue || 0)}
            </h5>
            <p className="text-sm tracking-wide text-desc">
              Total Products value in{" "}
              <span className="font-semibold leading-none text-foreground">
                {productsData.length || 0}
              </span>
              {"  "}
              inventories
            </p>
          </div>
          <ChartContainer
            config={chartConfig}
            className="max-h-[300px] min-h-[200px] w-full"
          >
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
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Line
                dataKey="value"
                type="bump"
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
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
          <Image
            src={"/assets/products-value-empty.svg"}
            width={150}
            height={150}
            alt="Total Products Value Empty"
            className="size-[80%] lg:size-[300px]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              Products value data unavailable
            </h4>
            <p className="max-w-md text-[10px] text-desc md:text-sm">
              Showing total products value / price from each inventory that you
              are part of.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
