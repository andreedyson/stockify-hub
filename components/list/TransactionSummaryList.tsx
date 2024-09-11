import { TransactionsCountType } from "@/types/server/transaction";
import { BadgeCheck, Ban, Hourglass, Loader } from "lucide-react";

type TransactionSummaryListType = {
  total: TransactionsCountType;
};

function TransactionSummaryList({
  total: {
    totalPending = 0,
    totalIn_progress = 0,
    totalCompleted = 0,
    totalCancelled = 0,
  },
}: TransactionSummaryListType) {
  return (
    <div className="grid grid-cols-1 gap-y-6 max-md:grid-cols-2">
      <div className="space-y-2">
        <div>
          <p className="flex items-center gap-1 text-xs font-medium capitalize text-orange-500">
            <Hourglass size={14} />
            PENDING
          </p>
        </div>
        <div className="border-l-[3px] border-orange-500">
          <p className="pl-3 text-xl font-bold leading-none md:text-3xl">
            {totalPending}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="flex items-center gap-1 text-xs font-medium capitalize text-blue-500">
            <Loader size={14} />
            IN PROGRESS
          </p>
        </div>
        <div className="border-l-[3px] border-blue-500">
          <p className="pl-3 text-xl font-bold leading-none md:text-3xl">
            {totalIn_progress}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="flex items-center gap-1 text-xs font-medium capitalize text-red-500">
            <Ban size={14} />
            CANCELLED
          </p>
        </div>
        <div className="border-l-[3px] border-red-500">
          <p className="pl-3 text-xl font-bold leading-none md:text-3xl">
            {totalCancelled}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="flex items-center gap-1 text-xs font-medium capitalize text-green-500">
            <BadgeCheck size={14} />
            COMPLETED
          </p>
        </div>
        <div className="border-l-[3px] border-green-500">
          <p className="pl-3 text-xl font-bold leading-none md:text-3xl">
            {totalCompleted}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionSummaryList;
