import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { InventoryMemberColumns as columns } from "@/components//tables/members/inventory-members-columns";
import AddCategoryDialog from "@/components/forms/AddCategoryDialog";
import AddMemberDialog from "@/components/forms/AddMemberDialog";
import EditInventoryForm from "@/components/forms/EditInventoryForm";
import CategoryList from "@/components/list/CategoryList";
import { DataTable } from "@/components/ui/data-table";
import { formatDate } from "@/lib/utils";
import { getInventoryCategories } from "@/server/category";
import {
  getCurrentInventoryMember,
  getInventoryById,
} from "@/server/inventory";
import { ArrowLeft, Crown } from "lucide-react";
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
  const tableData = await getCurrentInventoryMember(userId, id);
  const inventoryOwner = tableData.find((user) => user.role === "OWNER");
  const currentUserRole = tableData.find((user) => user)?.currentUserRole;
  const currentInventoryCategory = await getInventoryCategories(inventory.id);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 md:grid-cols-4 xl:grid-cols-12">
        {/* Inventory Details Card */}
        <div className="bg-main-card col-span-full grid-rows-1 rounded-md p-6 md:col-span-4">
          <div className="h-full">
            <div className="section-header flex items-center gap-2">
              <Link href={"/products"}>
                <ArrowLeft size={20} className="cursor-pointer lg:hidden" />
              </Link>
              <h3>Inventory Details</h3>
            </div>
            <div className="space-y-2">
              <div className="border-b-2 py-4 max-lg:space-y-3.5 lg:max-xl:grid lg:max-xl:grid-cols-4 lg:max-xl:content-center xl:space-y-4">
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-xs text-desc md:text-sm">
                    Inventory Owner
                  </p>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-orange-500 dark:text-yellow-500 md:text-base">
                    <Crown size={16} />
                    {inventoryOwner?.name}
                  </h4>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-xs text-desc md:text-sm">Inventory Name</p>
                  <h4 className="line-clamp-1 text-sm font-semibold md:text-base">
                    {inventory.name}
                  </h4>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-xs text-desc md:text-sm">Total Members</p>
                  <p className="text-sm font-semibold md:text-base">
                    {inventory.memberCount}{" "}
                    {(inventory.memberCount as number) > 1
                      ? "Members"
                      : "Member"}
                  </p>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-xs text-desc md:text-sm">Created</p>
                  <p className="text-sm font-semibold md:text-base">
                    {formatDate(inventory.createdAt)}
                  </p>
                </div>
                {currentUserRole === "USER" && (
                  <>
                    <div className="space-y-1 lg:space-y-2">
                      <p className="text-xs text-desc md:text-sm">
                        Last Updated
                      </p>
                      <p className="text-sm font-semibold md:text-base">
                        {formatDate(inventory.updatedAt)}
                      </p>
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                      <p className="text-xs text-desc md:text-sm">
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
              columns={columns}
              data={tableData}
              className="border-none"
              dataPerPage={4}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 max-md:gap-y-6 lg:grid-cols-12">
        {/* Product List */}
        <div className="bg-main-card rounded-md px-4 py-6 md:px-6 md:py-8 lg:col-span-8">
          <div>
            <h3 className="section-header">Products</h3>
          </div>
        </div>
        {/* Category List */}
        <div className="bg-main-card rounded-md px-4 py-6 md:px-6 lg:col-span-4">
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
    </section>
  );
}

export default InventoryDetailsPage;
