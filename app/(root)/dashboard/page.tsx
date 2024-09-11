import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import StatsCard from "@/components/cards/StatsCard";
import { DataTable } from "@/components/ui/data-table";
import {
  getTotalAssetsForUser,
  getUserDashboardStatistics,
} from "@/server/user";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { TransactionsColumns as columns } from "@/components/tables/transactions/transactions-columns";
import { getTransactionTableData } from "@/server/transaction";
import TotalAssetsList from "@/components/list/TotalAssetsList";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  const userId = session.user.id;

  const dashboardStatsData = await getUserDashboardStatistics(userId);
  const transactionsTableData = await getTransactionTableData(userId);
  const totalAssetsForUser = await getTotalAssetsForUser(userId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {dashboardStatsData.map((card) => (
          <div key={card.title}>
            <StatsCard
              title={card.title}
              amount={card.amount}
              color={card.color}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        <div className="bg-main-card col-span-1 space-y-3 rounded-md p-6 md:col-span-2 xl:col-span-9">
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
        <div className="bg-main-card col-span-1 space-y-3 rounded-md p-6 md:col-span-2 xl:col-span-3">
          <div>
            <h4 className="section-header">Total Assets</h4>
          </div>
          <div className="h-[90%]">
            <TotalAssetsList assets={totalAssetsForUser} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-main-card col-span-1 rounded-md p-6">
          <div>
            <h4 className="section-header">Transaction By Status</h4>
          </div>
        </div>
        <div className="bg-main-card col-span-1 rounded-md p-6">
          <div>
            <h4 className="section-header">Top Selling</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
