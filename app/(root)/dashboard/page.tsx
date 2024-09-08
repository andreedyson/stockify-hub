import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import StatsCard from "@/components/cards/StatsCard";
import { getUserDashboardStatistics } from "@/server/user";
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

  const dashboardStatsData = await getUserDashboardStatistics(userId);

  return (
    <div>
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
    </div>
  );
}

export default DashboardPage;
