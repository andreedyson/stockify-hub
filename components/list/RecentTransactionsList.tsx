import { cn, formatDate } from "@/lib/utils";
import { RecentTransactionsType } from "@/types/server/transaction";
import { BadgeCheck, Ban, Hourglass, Loader } from "lucide-react";

type RecentTransactionsListType = {
  transactionData: RecentTransactionsType;
};

function RecentTransactionsList({
  transactionData,
}: RecentTransactionsListType) {
  const status = transactionData.status;
  const statusColor =
    status === "PENDING"
      ? "text-orange-500"
      : status === "IN_PROGRESS"
        ? "text-blue-500"
        : status === "COMPLETED"
          ? "text-green-500"
          : "text-red-500";

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Icon & Transaction Data */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-md bg-input dark:bg-muted md:size-[52px]",
              statusColor,
            )}
          >
            {status === "PENDING" ? (
              <Hourglass size={24} />
            ) : status === "IN_PROGRESS" ? (
              <Loader size={24} />
            ) : status === "COMPLETED" ? (
              <BadgeCheck size={24} />
            ) : (
              <Ban size={24} />
            )}
          </div>
          <div className="space-y-1">
            <h5 className="line-clamp-1 max-w-[200px] text-sm max-md:max-w-[120px] md:text-base">
              {transactionData.productName}
            </h5>
            <p className="bg-pill-sm line-clamp-1 w-fit max-w-[200px] rounded-full px-3 py-1 text-[10px]/[13px] md:text-xs">
              {transactionData.categoryName}
            </p>
          </div>
        </div>
        {/* Transaction Date */}
        <div>
          <p className="text-xs md:text-sm">
            {formatDate(transactionData.date)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactionsList;
