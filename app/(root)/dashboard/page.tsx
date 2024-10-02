import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import StatsCard from "@/components/cards/StatsCard";
import HighestSellingData from "@/components/HighestSellingData";
import TotalAssetsList from "@/components/list/TotalAssetsList";
import { TransactionsColumns as columns } from "@/components/tables/transactions/transactions-columns";
import TransactionByStatusData from "@/components/TransactionByStatusData";
import { DataTable } from "@/components/ui/data-table";
import { getHighestSellingProducts } from "@/server/product";
import {
  getTransactionByStatusChartData,
  getTransactionTableData,
} from "@/server/transaction";
import {
  getTotalAssetsForUser,
  getUserDashboardStatistics,
} from "@/server/user";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  const userId = session.user.id;

  const [
    dashboardStatsData,
    transactionsTableData,
    totalAssetsForUser,
    transactionByStatus,
    highestSellingProducts,
  ] = await Promise.all([
    getUserDashboardStatistics(userId),
    getTransactionTableData(userId),
    getTotalAssetsForUser(userId),
    getTransactionByStatusChartData(userId),
    getHighestSellingProducts(userId),
  ]);

  return (
    <div className="space-y-6">
      {/* Dashboard Statistics Card */}
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
        {/* Transactions Table */}
        <div className="bg-main-card col-span-1 space-y-3 rounded-md p-6 md:col-span-2 xl:col-span-9">
          <div>
            <h4 className="section-header">Transactions</h4>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={transactionsTableData}
              className="border-none"
              dataPerPage={5}
            />
          </div>
        </div>

        {/* Total Assets Overview */}
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
        {/* Transaction By Status Bar Chart */}
        <div className="bg-main-card col-span-1 space-y-3 rounded-md p-6">
          <div>
            <h4 className="section-header">Transaction By Status</h4>
          </div>
          <div>
            <TransactionByStatusData transactionsData={transactionByStatus} />
          </div>
        </div>

        {/* Top Selling Product List */}
        <div className="bg-main-card col-span-1 space-y-3 rounded-md p-6">
          <div>
            <h4 className="section-header">Top Selling</h4>
          </div>
          <div>
            <HighestSellingData productsData={highestSellingProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
