import TransactionSummaryList from "@/components/list/TransactionSummaryList";
import { getTotalTransactionsByStatus } from "@/server/transaction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

async function TransactionsPage() {
  const transactionSummary = await getTotalTransactionsByStatus();

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-1 lg:col-span-3">
          <div>
            <h4 className="section-header">Summary</h4>
          </div>
          <TransactionSummaryList total={transactionSummary} />
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-1 lg:col-span-9">
          <div>
            <h4 className="section-header">Transactions</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <div className="bg-main-card rounded-md p-6 md:col-span-1 lg:col-span-8">
          <div>
            <h4 className="section-header">Insights</h4>
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-1 lg:col-span-4">
          <div>
            <h4 className="section-header">Recent Transactions</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransactionsPage;
