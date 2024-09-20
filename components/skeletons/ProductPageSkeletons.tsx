import { Skeleton } from "../ui/skeleton";

function ProductPageSkeletons() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-12 lg:grid-rows-6">
        <Skeleton className="h-[500px] md:col-span-4 lg:col-span-8 lg:row-span-full lg:h-[800px]" />
        <Skeleton className="col-span-1 max-lg:h-[300px] md:col-span-2 lg:col-span-4 lg:row-span-3" />
        <Skeleton className="col-span-1 max-lg:h-[300px] md:col-span-2 lg:col-span-4 lg:row-span-3" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-[200px] w-full lg:h-[400px]" />
        <Skeleton className="h-[200px] w-full lg:h-[400px]" />
      </div>
    </div>
  );
}

export default ProductPageSkeletons;
