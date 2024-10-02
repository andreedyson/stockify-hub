import { Skeleton } from "@/components/ui/skeleton";

function InventoryDetailsPageSkeletons() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 md:grid-cols-4 xl:grid-cols-12">
        {/* Inventory Details Skeleton */}
        <Skeleton className="col-span-full h-96 rounded-md p-6 md:col-span-4 lg:h-[600px]" />
        {/* Member Details Skeleton */}
        <Skeleton className="h-96 rounded-md p-6 md:col-span-4 lg:h-[600px] xl:col-span-8" />
      </div>

      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 lg:grid-cols-12">
        <Skeleton className="col-span-1 h-80 w-full lg:col-span-8" />
        <Skeleton className="col-span-1 h-80 w-full lg:col-span-4" />
      </div>

      <div className="grid grid-cols-1 gap-4 max-md:gap-y-6 lg:grid-cols-12">
        <Skeleton className="col-span-1 h-80 w-full lg:col-span-4" />
        <Skeleton className="col-span-1 h-80 w-full lg:col-span-8" />
      </div>
    </div>
  );
}

export default InventoryDetailsPageSkeletons;
