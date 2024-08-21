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

  const totalProductsValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
          <Banknote size={32} />
          {currencyFormatterIDR(totalProductsValue)}
        </h5>
        <p className="text-sm text-desc">
          Total Products value in{" "}
          <span className="text-foreground">{productsData.length}</span>{" "}
          inventories
        </p>
      </div>
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
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
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
    </div>
  );
}
