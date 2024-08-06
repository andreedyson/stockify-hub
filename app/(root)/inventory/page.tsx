import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import InventoryCard from "@/components/cards/InventoryCard";
import AddInventoryDialog from "@/components/forms/AddInventoryDialog";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db";
import { getUserInventories } from "@/server/inventory";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Inventory",
};

async function InventoryPage() {
  const session = await getServerSession(authOptions);
  const userInventories = await getUserInventories(session?.user.id as string);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input placeholder="Search inventory..." />
        <AddInventoryDialog userId={session?.user.id as string} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userInventories.map((inv) => (
          <div key={inv.id}>
            <InventoryCard userData={inv} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryPage;
