import { TransactionsCount } from "@/types/server/transaction";

type TransactionSummaryListType = {
  total: TransactionsCount;
};

function TransactionSummaryList({
  total: {
    totalPending = 0,
    totalInProgress = 0,
    totalCompleted = 0,
    totalCancelled = 0,
  },
}: TransactionSummaryListType) {
  return (
    <div className="grid grid-cols-2 gap-y-6">
      <div className="space-y-2">
        <div>
          <p className="text-xs capitalize text-desc">PENDING</p>
        </div>
        <div className="border-l-[3px] border-orange-500">
          <p className="pl-3 text-3xl font-bold leading-none">{totalPending}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs capitalize text-desc">IN PROGRESS</p>
        </div>
        <div className="border-l-[3px] border-blue-500">
          <p className="pl-3 text-3xl font-bold leading-none">
            {totalInProgress}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs capitalize text-desc">CANCELLED</p>
        </div>
        <div className="border-l-[3px] border-red-500">
          <p className="pl-3 text-3xl font-bold leading-none">
            {totalCancelled}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-xs capitalize text-desc">COMPLETED</p>
        </div>
        <div className="border-l-[3px] border-green-500">
          <p className="pl-3 text-3xl font-bold leading-none">
            {totalCompleted}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionSummaryList;
