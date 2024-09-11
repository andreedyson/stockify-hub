import { TotalTransactionByStatusChartProps } from "@/types/server/transaction";
import { TotalTransactionCharts } from "./charts/TotalTransactionCharts";

type TransactionByStatusDataProps = {
  transactionsData: TotalTransactionByStatusChartProps;
};

function TransactionByStatusData({
  transactionsData,
}: TransactionByStatusDataProps) {
  return (
    <article className="h-full w-full space-y-4">
      <div>
        <p className="font-medium">
          {transactionsData.thisWeekTransactions} transactions this week
        </p>
        <p className="text-sm text-desc">
          Showing total transactions per status
        </p>
      </div>
      <div className="w-full">
        <TotalTransactionCharts transactionData={transactionsData.chartData} />
      </div>
    </article>
  );
}

export default TransactionByStatusData;
