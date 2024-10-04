"use client";

import { getUserInventoriesData } from "@/data/inventory-data";
import { UserInventories } from "@/types/server/inventory";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import InventoryCard from "../cards/InventoryCard";
import AddInventoryDialog from "../dialogs/AddInventoryDialog";
import InventorySearchSkeletons from "../skeletons/InventorySearchSkeletons";
import { Input } from "../ui/input";

type InventorySearchProps = {
  userId: string;
};

function InventorySearch({ userId }: InventorySearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: inventoryData,
    isLoading,
    error,
  } = useQuery<UserInventories>({
    queryKey: ["inventoriesData", userId],
    queryFn: () => getUserInventoriesData(userId),
  });

  const filteredInventories = useMemo(() => {
    return inventoryData?.results.filter((inventory) =>
      inventory.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, inventoryData]);

  if (isLoading)
    return (
      <div>
        <InventorySearchSkeletons />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex flex-1 items-center">
          <SearchIcon className="absolute left-3 z-30" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input pl-12"
          />
        </div>
        <AddInventoryDialog userId={userId} />
      </div>

      {/* Inventory Card */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredInventories!.length > 0 ? (
          filteredInventories?.map((inv) => (
            <div key={inv.id}>
              <InventoryCard inventoryData={inv} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-full flex-col items-center justify-center gap-5 text-center font-light lg:h-[350px]">
            <Image
              src={"/assets/data-not-found.svg"}
              width={400}
              height={500}
              alt="Data Not Found"
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold md:text-base">
                No inventory data found
              </h4>
              <p className="desc-2 max-w-md text-[10px] md:text-sm">
                This is where you&apos;ll see a list of all the inventories you
                own or have been added to.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventorySearch;
