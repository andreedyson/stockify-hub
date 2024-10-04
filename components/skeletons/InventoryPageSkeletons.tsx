import { Skeleton } from "@/components/ui/skeleton";
import InventorySearchSkeletons from "./InventorySearchSkeletons";

function InventoryPageSkeletons() {
  return (
    <div className="space-y-6">
      {/* Inventory Search Skeleton */}
      <InventorySearchSkeletons />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        <Skeleton className="h-96 w-full md:col-span-2 xl:col-span-9" />
        <Skeleton className="h-96 w-full md:col-span-2 xl:col-span-3" />
      </div>
      <div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}

export default InventoryPageSkeletons;
