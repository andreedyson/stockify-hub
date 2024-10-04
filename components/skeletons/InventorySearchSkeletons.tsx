import React from "react";
import { Skeleton } from "../ui/skeleton";

function InventorySearchSkeletons() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-[150px] rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              className="h-[156px] w-full rounded-md 2xl:max-w-[320px]"
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default InventorySearchSkeletons;
