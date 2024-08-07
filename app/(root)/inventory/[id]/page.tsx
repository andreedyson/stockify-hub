import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { InventoryMemberColumns as columns } from "@/components//tables/members/inventory-members-columns";
import AddMemberDialog from "@/components/forms/AddMemberDialog";
import EditInventoryForm from "@/components/forms/EditInventoryForm";
import { DataTable } from "@/components/ui/data-table";
import { formatDate } from "@/lib/utils";
import {
  getCurrentInventoryMember,
  getInventoryById,
} from "@/server/inventory";
import { Crown } from "lucide-react";
import { getServerSession } from "next-auth";
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

  const inventory = await getInventoryById(session.user.id, id);
  const data = await getCurrentInventoryMember(session.user.id, id);

  const inventoryOwner = data.find((user) => user.role === "OWNER")?.name;

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        {/* Inventory Details Card */}
        <div className="bg-main-card col-span-full grid-rows-1 rounded-md p-6 md:col-span-4">
          <div className="h-full">
            <div>
              <h3 className="section-header">Inventory Details</h3>
            </div>
            <div className="space-y-2">
              <div className="content-center border-b-2 py-4 max-lg:space-y-3.5 lg:max-xl:grid lg:max-xl:grid-cols-4 xl:space-y-4">
                <div className="space-y-1 lg:space-y-2">
                  <p className="text-xs text-desc md:text-sm">
                    Inventory Owner
                  </p>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-orange-500 dark:text-yellow-500 md:text-base">
                    <Crown size={16} />
                    {inventoryOwner}
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
              </div>
              <EditInventoryForm
                userId={session.user.id}
                inventoryData={{
                  id: inventory.id,
                  name: inventory.name,
                  color: inventory.color as string,
                }}
              />
            </div>
          </div>
        </div>

        {/* Member Details Card */}
        <div className="bg-main-card h-full rounded-md p-6 md:col-span-4 xl:col-span-8">
          <div className="section-header flex items-center justify-between">
            <h3>Members</h3>
            <AddMemberDialog inventoryId={inventory.id} />
          </div>
          <div className="mt-4">
            <DataTable columns={columns} data={data} className="border-none" />
          </div>
        </div>

        {/* Product List */}
        <div className="bg-main-card rounded-md px-4 py-6 md:col-span-full md:px-6 md:py-8">
          <div>
            <h3 className="section-header">Products</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryDetailsPage;
