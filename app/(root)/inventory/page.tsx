import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { TotalProductsCharts } from "@/components/charts/TotalProductsCharts";
import InventorySearch from "@/components/forms/InventorySearch";
import InventoryCategoryData from "@/components/InventoryCategoryData";
import UserRoleData from "@/components/UserRoleData";
import { getInventoriesCategoriesChartData } from "@/server/category";
import {
  currentUserInventoriesRoles,
  getUserInventories,
} from "@/server/inventory";
import { getInventoriesProductCount } from "@/server/product";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Inventory",
};

async function InventoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;
  const [
    userInventories,
    totalProductsChartData,
    userRoles,
    inventoriesCategoriesData,
  ] = await Promise.all([
    getUserInventories(userId),
    getInventoriesProductCount(userId),
    currentUserInventoriesRoles(userId),
    getInventoriesCategoriesChartData(userId),
  ]);

  return (
    <section className="space-y-6">
      {/* Inventory Card, Search, Add Inventory */}
      <InventorySearch
        userId={session?.user.id as string}
        inventoryData={userInventories}
      />

      {/* Total Products & User Role Lists */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-2 xl:col-span-9">
          <div>
            <h4 className="section-header">Inventory Categories</h4>
          </div>
          <div>
            <InventoryCategoryData categoryData={inventoriesCategoriesData} />
          </div>
        </div>

        <div className="bg-main-card space-y-3 rounded-md p-6 md:col-span-2 xl:col-span-3">
          <div>
            <h4 className="section-header">Your Role</h4>
          </div>
          <div className="h-[80%]">
            <UserRoleData userRoleData={userRoles} />
          </div>
        </div>
      </div>

      {/* Inventory Categories */}
      <div className="w-full">
        <div className="bg-main-card rounded-md p-6">
          <div>
            <h4 className="section-header">Total Products</h4>
          </div>
          <div className="mt-4">
            <TotalProductsCharts
              productsData={totalProductsChartData}
              inventoriesData={userInventories}
              align="row"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryPage;
