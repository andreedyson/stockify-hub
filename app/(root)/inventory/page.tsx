import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { InventoryCategoryCharts } from "@/components/charts/InventoryCategoryCharts";
import { TotalProductsCharts } from "@/components/charts/TotalProductsCharts";
import InventorySearch from "@/components/forms/InventorySearch";
import InventoryCategoryList from "@/components/list/InventoryCategoryList";
import UserRolesList from "@/components/list/UserRolesList";
import InventorySearchSkeletons from "@/components/skeletons/InventorySearchSkeletons";
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
  const userInventories = await getUserInventories(userId);
  const totalProductsChartData = await getInventoriesProductCount(userId);
  const userRoles = await currentUserInventoriesRoles(userId);
  const inventoriesCategoriesData =
    await getInventoriesCategoriesChartData(userId);

  return (
    <section className="space-y-6">
      {/* Inventory Card, Search, Add Inventory */}
      <Suspense fallback={<InventorySearchSkeletons />}>
        <InventorySearch
          userId={session?.user.id as string}
          inventoryData={userInventories}
        />
      </Suspense>

      {/* Inventory Activity & User Role Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        <div className="bg-main-card rounded-md p-6 md:col-span-2 xl:col-span-9">
          <div>
            <h4 className="section-header">Activity</h4>
          </div>
        </div>
        <div className="bg-main-card space-y-3 rounded-md p-6 md:col-span-2 xl:col-span-3">
          <div>
            <h4 className="section-header">Your Role</h4>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:max-md:grid-cols-2">
            {userRoles.map((user) => (
              <UserRolesList key={user.userId} data={user} />
            ))}
          </div>
        </div>
      </div>

      {/*  */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-main-card space-y-4 rounded-md p-6">
          <div>
            <h4 className="section-header">Inventory Categories</h4>
          </div>
          <div>
            <InventoryCategoryList categoryData={inventoriesCategoriesData} />
          </div>
        </div>
        <div className="bg-main-card h-full rounded-md p-6">
          <div>
            <h4 className="section-header">Total Products</h4>
          </div>
          <div className="mt-4">
            <TotalProductsCharts
              productsData={totalProductsChartData}
              inventoriesData={userInventories}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryPage;
