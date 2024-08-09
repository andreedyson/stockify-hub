import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import InventoryCard from "@/components/cards/InventoryCard";
import AddInventoryDialog from "@/components/forms/AddInventoryDialog";
import InventorySearch from "@/components/forms/InventorySearch";
import { Input } from "@/components/ui/input";
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
      {/* Inventory Card, Search, Add Inventory */}
      <InventorySearch
        userId={session?.user.id as string}
        inventoryData={userInventories}
      />

      {/* Inventory Activity & User Role Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        <div className="bg-main-card rounded-md p-6 md:col-span-2 xl:col-span-9">
          <div>
            <h4 className="section-header">Activity</h4>
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-2 xl:col-span-3">
          <div>
            <h4 className="section-header">Your Role</h4>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-main-card rounded-md p-6">
          {" "}
          <div>
            <h4 className="section-header">Total Members</h4>
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6">
          <div>
            <h4 className="section-header">Total Products</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
