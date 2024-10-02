export const maxDuration = 15;

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { InventoryMemberColumns as memberColumns } from "@/components//tables/members/inventory-members-columns";
import { TransactionInsightCharts } from "@/components/charts/TransactionInsightCharts";
import AddCategoryDialog from "@/components/dialogs/AddCategoryDialog";
import AddMemberDialog from "@/components/dialogs/AddMemberDialog";
import AddTransactionDialog from "@/components/dialogs/AddTransactionDialog";
import EditInventoryForm from "@/components/dialogs/EditInventoryForm";
import CategoryList from "@/components/list/CategoryList";
import ProductsList from "@/components/list/ProductsList";
import BackButton from "@/components/navigations/BackButton";
import { TransactionsColumns as transactionColumns } from "@/components/tables/transactions/transactions-columns";
import { DataTable } from "@/components/ui/data-table";
import { formatDate } from "@/lib/utils";
import { getInventoryCategories } from "@/server/category";
import {
  getCurrentInventoryMembers,
  getInventoryById,
} from "@/server/inventory";
import { getProductsByInventory } from "@/server/product";
import { getTransactionTableByInventories } from "@/server/transaction";
import { ChevronRight, Crown } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function InventoryDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;
  const inventory = await getInventoryById(userId, id);

  const [
    memberTableData,
    currentInventoryCategory,
    inventoryProducts,
    transactionsTableData,
  ] = await Promise.all([
    getCurrentInventoryMembers(userId, id),
    getInventoryCategories(inventory.id),
    getProductsByInventory(userId, id),
    getTransactionTableByInventories(userId, id),
  ]);

  const inventoryOwner = memberTableData.find((user) => user.role === "OWNER");
  const currentUserRole = memberTableData.find((user) => user)?.currentUserRole;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 md:grid-cols-4 xl:grid-cols-12">
        {/* Inventory Details Card */}
        <div className="bg-main-card col-span-full grid-rows-1 rounded-md p-6 md:col-span-4">
          <div className="h-full">
            <div className="section-header flex items-center gap-2">
              <BackButton className="flex items-center gap-2">
                <h3>Inventory Details</h3>
              </BackButton>
            </div>
            <div className="space-y-2">
              <div className="border-b-2 py-4 max-lg:space-y-3.5 lg:max-xl:grid lg:max-xl:grid-cols-4 lg:max-xl:content-center xl:space-y-4">
                <div className="space-y-1 lg:space-y-2">
                  <p className="desc-2 text-xs md:text-sm">Inventory Owner</p>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-orange-500 dark:text-yellow-500 md:text-base">
                    <Crown size={16} />
                    {inventoryOwner?.name}
                  </h4>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <p className="desc-2 text-xs md:text-sm">Inventory Name</p>
                  <h4 className="line-clamp-1 text-sm font-semibold md:text-base">
                    {inventory.name}
                  </h4>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <p className="desc-2 text-xs md:text-sm">Total Members</p>
                  <p className="text-sm font-semibold md:text-base">
                    {inventory.memberCount}{" "}
                    {(inventory.memberCount as number) > 1
                      ? "Members"
                      : "Member"}
                  </p>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <p className="desc-2 text-xs md:text-sm">Created</p>
                  <p className="text-sm font-semibold md:text-base">
                    {formatDate(inventory.createdAt)}
                  </p>
                </div>
                {currentUserRole === "USER" && (
                  <>
                    <div className="space-y-1 lg:space-y-2">
                      <p className="desc-2 text-xs md:text-sm">Last Updated</p>
                      <p className="text-sm font-semibold md:text-base">
                        {formatDate(inventory.updatedAt)}
                      </p>
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                      <p className="desc-2 text-xs md:text-sm">
                        Your Current Role
                      </p>
                      <h4 className="line-clamp-1 text-sm font-semibold md:text-base">
                        USER
                      </h4>
                    </div>
                  </>
                )}
              </div>
              {currentUserRole !== "USER" && (
                <EditInventoryForm
                  userId={userId}
                  inventoryData={{
                    id: inventory.id,
                    name: inventory.name,
                    color: inventory.color as string,
                    ownerId: inventoryOwner?.userId as string,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Member Details Card */}
        <div className="bg-main-card h-full rounded-md p-6 md:col-span-4 xl:col-span-8">
          <div className="section-header flex items-center justify-between">
            <h3>Members</h3>
            {currentUserRole !== "USER" && (
              <AddMemberDialog inventoryId={inventory.id} />
            )}
          </div>
          <div className="mt-4">
            <DataTable
              columns={memberColumns}
              data={memberTableData}
              className="border-none"
              dataPerPage={4}
              showSearch
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 lg:grid-cols-12">
        {/* Product List */}
        <div className="bg-main-card col-span-1 w-full space-y-4 rounded-md px-4 py-6 md:px-6 md:py-8 lg:col-span-8">
          <div className="section-header flex items-center justify-between">
            <h3>Products</h3>
            <Link
              href={"/products/add-product"}
              className="flex items-center text-sm text-main-500 duration-200 hover:text-main-300 hover:underline"
            >
              Add Product
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="mt-2 w-full">
            <ProductsList products={inventoryProducts} />
          </div>
        </div>
        {/* Category List */}
        <div className="bg-main-card col-span-1 w-full rounded-md px-4 py-6 md:px-6 lg:col-span-4">
          <div className="section-header flex items-center justify-between">
            <h3>Categories</h3>
            {currentUserRole !== "USER" && (
              <AddCategoryDialog inventoryId={inventory.id} />
            )}
          </div>
          <div>
            {currentInventoryCategory.map((category) => (
              <CategoryList
                key={category.id}
                data={category}
                userRole={currentUserRole as string}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 lg:grid-cols-12">
        <div className="bg-main-card col-span-1 w-full space-y-4 rounded-md p-6 lg:col-span-4">
          <div>
            <h4 className="section-header">Insights</h4>
          </div>
          <div className="h-[85%]">
            <TransactionInsightCharts inventoryId={id} />
          </div>
        </div>
        {/* Transactions Table */}
        <div className="bg-main-card col-span-1 w-full space-y-4 rounded-md p-6 lg:col-span-8">
          <div className="section-header flex items-center justify-between">
            <h4>Transactions</h4>
            <AddTransactionDialog userId={userId} inventoryId={id} />
          </div>
          <div>
            <DataTable
              columns={transactionColumns}
              data={transactionsTableData}
              className="border-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryDetailsPage;
