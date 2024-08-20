import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TransactionSummaryList from "@/components/list/TransactionSummaryList";
import { TransactionsColumns as columns } from "@/components/tables/transactions/transactions-columns";
import { DataTable } from "@/components/ui/data-table";
import {
  getTotalTransactionsByStatus,
  getTransactionTableData,
} from "@/server/transaction";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Transactions",
};

async function TransactionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const transactionSummary = await getTotalTransactionsByStatus();
  const transactionsTableData = await getTransactionTableData(userId);

  return (
    <section className="space-y-6">
      <div></div>
      <div className="grid grid-cols-1">
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-1 lg:col-span-9">
          <div>
            <h4 className="section-header">Transactions</h4>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={transactionsTableData}
              className="border-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-1 xl:col-span-3">
          <div>
            <h4 className="section-header">Summary</h4>
          </div>
          <TransactionSummaryList total={transactionSummary} />
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-1 xl:col-span-6">
          <div>
            <h4 className="section-header">Insights</h4>
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6 sm:col-span-2 xl:col-span-3">
          <div>
            <h4 className="section-header">Recent Transactions</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransactionsPage;
