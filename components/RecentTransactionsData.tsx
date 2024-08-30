import { RecentTransactionsType } from "@/types/server/transaction";
import RecentTransactionsList from "./list/RecentTransactionsList";
import Image from "next/image";

type RecentTransactionsDataType = {
  transactionsData: RecentTransactionsType[];
};

function RecentTransactionsData({
  transactionsData,
}: RecentTransactionsDataType) {
  return (
    <>
      {transactionsData.length ? (
        <div className="grid grid-cols-1 gap-4 sm:max-md:grid-cols-2">
          {transactionsData.map((transaction) => (
            <RecentTransactionsList
              key={transaction.id}
              transactionData={transaction}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-4 text-center">
          <Image
            src={"/assets/list-empty.svg"}
            width={200}
            height={400}
            alt="User Roles Not Found"
            className="size-[80%] lg:size-[250px]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              Recent transactions unavailable
            </h4>
            <p className="desc-2 text-[10px] md:text-sm">
              There are currently no recent transactions. We&apos;ll show you
              transactions from the past week.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default RecentTransactionsData;
