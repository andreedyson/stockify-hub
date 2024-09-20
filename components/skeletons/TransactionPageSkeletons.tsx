import { Skeleton } from "../ui/skeleton";

function TransactionPageSkeletons() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
        <Skeleton className="h-[200px] sm:h-[400px] md:col-span-1 xl:col-span-2" />
        <Skeleton className="h-[400px] md:col-span-1 xl:col-span-6" />
        <Skeleton className="h-[400px] sm:col-span-2 xl:col-span-4" />
      </div>

      <div>
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
}

export default TransactionPageSkeletons;
