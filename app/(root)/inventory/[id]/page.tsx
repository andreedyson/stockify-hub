import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import EditInventoryForm from "@/components/forms/EditInventoryForm";
import { formatDate } from "@/lib/utils";
import { getInventoryById } from "@/server/inventory";
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

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {/* Inventory Details Card */}
        <div className="bg-main-card col-span-full rounded-md p-6 md:col-span-2">
          <div>
            <h3 className="border-b-2 pb-2 text-base font-semibold md:text-lg">
              Inventory Details
            </h3>
          </div>

          <div className="space-y-2">
            <div className="space-y-2 border-b-2 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm">Inventory Name</p>
                <h4 className="text-sm font-semibold md:text-base">
                  {inventory.name}
                </h4>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm">Total Members</p>
                <p className="text-sm font-semibold md:text-base">
                  {inventory.memberCount}{" "}
                  {(inventory.memberCount as number) > 1 ? "Members" : "Member"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm">Created</p>
                <p className="text-sm font-semibold md:text-base">
                  {formatDate(inventory.createdAt)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm">Last Updated</p>
                <p className="text-sm font-semibold md:text-base">
                  {formatDate(inventory.updatedAt)}
                </p>
              </div>
            </div>
            <EditInventoryForm
              userId={session.user.id}
              inventoryData={{
                id: inventory.id,
                name: inventory.name,
                color: inventory.color as string,
                createdAt: inventory.createdAt,
                updatedAt: inventory.updatedAt,
              }}
            />
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-2 lg:col-span-3"></div>
        <div className="bg-main-card rounded-md px-4 py-6 md:col-span-full md:px-6 md:py-8"></div>
      </div>
    </section>
  );
}

export default InventoryDetailsPage;
