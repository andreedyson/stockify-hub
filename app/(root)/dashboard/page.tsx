import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import StatsCard from "@/components/cards/StatsCard";
import prisma from "@/lib/db";
import { Blocks, Container, Package, Receipt } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DUMMY_DATA = [
  {
    title: "Total Products",
    amount: 12,
    color: "255, 203, 17",
    icon: <Package size={28} />,
  },
  {
    title: "Total Inventories",
    amount: 3,
    color: "17, 141, 255",
    icon: <Container size={28} />,
  },
  {
    title: "Total Categories",
    amount: 7,
    color: "136, 17, 255",
    icon: <Blocks size={28} />,
  },
  {
    title: "Total Transactions",
    amount: 24,
    color: "255, 146, 17",
    icon: <Receipt size={28} />,
  },
];

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {DUMMY_DATA.map((card) => (
          <div key={card.title}>
            <StatsCard
              title={card.title}
              amount={card.amount}
              color={card.color}
              icon={card.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
