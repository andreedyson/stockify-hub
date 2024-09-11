"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TotalTransactionChartsDataProps } from "@/types/server/transaction";
import Image from "next/image";

type TotalTransactionChartsProps = {
  transactionData: TotalTransactionChartsDataProps[];
};

export function TotalTransactionCharts({
  transactionData,
}: TotalTransactionChartsProps) {
  const chartData = transactionData;

  const maxTotal = Math.max(...transactionData.map((data) => data.total));
  const ticks = Array.from(
    { length: Math.ceil(maxTotal / 5) + 1 },
    (_, i) => i * 5,
  );

  const chartConfig = {
    total: {
      label: "Total",
      color: "#000000",
    },
    PENDING: {
      label: "Pending",
      color: "#f97316",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "#3b82f6",
    },
    COMPLETED: {
      label: "Completed",
      color: "#22c55e",
    },
    CANCELLED: {
      label: "Cancelled",
      color: "#ef4444",
    },
  } satisfies ChartConfig;
  return (
    <>
      {chartData.length ? (
        <ChartContainer
          config={chartConfig}
          className="max-h-[300px] min-h-[200px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
              style={{ fontSize: "12px" }}
            />
            <YAxis
              dataKey="total"
              tickLine={false}
              tickMargin={15}
              axisLine={false}
              ticks={ticks}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" strokeWidth={2} radius={6}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartConfig[entry.status as keyof typeof chartConfig]?.color
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
          <Image
            src={"/assets/total-products-empty.svg"}
            width={150}
            height={150}
            alt="Total Products Empty"
            className="size-[50%] lg:size-[75%]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              No transactions by status data
            </h4>
            <p className="desc-2 max-w-96 text-[10px] md:text-sm">
              There are currently no transactions from the inventories that you
              are a part of.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
