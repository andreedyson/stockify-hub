"use client";

import { InventoryCardType } from "@/types";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import InventoryCard from "../cards/InventoryCard";
import { Input } from "../ui/input";
import AddInventoryDialog from "../dialogs/AddInventoryDialog";

type InventorySearchProps = {
  userId: string;
  inventoryData: InventoryCardType[];
};

function InventorySearch({ userId, inventoryData }: InventorySearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredInventories = useMemo(() => {
    return inventoryData.filter((inventory) =>
      inventory.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, inventoryData]);

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
        {filteredInventories.length > 0 ? (
          filteredInventories.map((inv) => (
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
                No Inventory Found
              </h4>
              <p className="text-[10px] text-desc md:text-sm">
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
