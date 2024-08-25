"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BASE_URL } from "@/constants";
import { formatDate } from "@/lib/utils";
import { TransactionsInsightsType } from "@/types/server/transaction";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import TimespanSelect from "../TimespanSelect";
import Image from "next/image";

export function TransactionInsightCharts() {
  const [chartData, setChartData] = useState<TransactionsInsightsType[]>([]);
  const [timespan, setTimespan] = useState<string>("all");
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? "";

  const chartConfig = {
    date: {
      label: "Date",
      color: "hsl(var(--chart-3))",
    },
    total: {
      label: "Total",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${BASE_URL}/api/transaction/timespan?span=${timespan}&userId=${userId}`,
      );

      const data = await res.json();
      setChartData(data);
    };

    fetchData();
  }, [timespan, userId]);

  if (status === "loading") return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-end">
        <TimespanSelect onValueChange={(value: string) => setTimespan(value)} />
      </div>
      {chartData.length ? (
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatDate(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" hideLabel />}
            />
            <Line
              dataKey="total"
              type="bump"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-3))",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
          <Image
            src={"/assets/products-value-empty.svg"}
            width={150}
            height={150}
            alt="Total Products Value Empty"
            className="size-[80%] lg:size-[60%]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              Your Transaction History is Empty
            </h4>
            <p className="max-w-sm text-[10px] text-desc md:text-sm">
              It seems you haven&apos;t made any transactions during that
              timespan yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
