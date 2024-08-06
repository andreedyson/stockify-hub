import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import EditInventoryForm from "@/components/forms/EditInventoryForm";
import { formatDate } from "@/lib/utils";
import { getInventoryById } from "@/server/inventory";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  Member,
  InventoryMemberColumns as columns,
} from "@/app/members/inventory-members-columns";
import { DataTable } from "@/components/ui/data-table";
import AddMemberDialog from "@/components/forms/AddMemberDialog";

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Andre Edyson",
      email: "m@example.com",
      role: "OWNER",
      photo: "test",
    },
    {
      id: "728ed52f",
      name: "Dinan",
      email: "m2@example.com",
      role: "USER",
      photo: "test",
    },
  ];
}

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
  const data = await getData();

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-12">
        {/* Inventory Details Card */}
        <div className="bg-main-card col-span-full rounded-md p-6 md:col-span-4">
          <div>
            <h3 className="section-header">Inventory Details</h3>
          </div>
          <div className="space-y-2">
            <div className="space-y-3 border-b-2 py-4">
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

        {/* Member Details Card */}
        <div className="bg-main-card h-full rounded-md p-6 md:col-span-4 lg:col-span-8">
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
