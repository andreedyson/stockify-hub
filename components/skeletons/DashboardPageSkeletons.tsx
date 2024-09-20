import { Skeleton } from "../ui/skeleton";

function DashboardPageSkeletons() {
  return (
    <div className="space-y-6">
      {/* Stats Card Skeletons */}
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                className="h-[120px] w-full rounded-md 2xl:max-w-[320px]"
                key={index}
              />
            ))}
        </div>
      </div>

      {/* Transaction Table & Total Assets Skeletons  */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-12">
        <Skeleton className="h-[450px] w-full rounded-md p-6 md:col-span-2 xl:col-span-9" />
        <Skeleton className="h-[450px] w-full rounded-md p-6 md:col-span-2 xl:col-span-3" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
}

export default DashboardPageSkeletons;
