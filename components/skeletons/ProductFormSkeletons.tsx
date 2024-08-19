import { Skeleton } from "../ui/skeleton";

function ProductFormSkeletons() {
  return (
    <div className="rounded-md bg-accent p-6">
      <div className="space-y-6">
        <div className="section-header">
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Form Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <Skeleton className="size-32 rounded-md" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 max-w-[650px] rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 max-w-[650px] rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 max-w-[650px] rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-32 max-w-[650px] rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-full max-w-[315px]" />
            <Skeleton className="h-10 w-full max-w-[315px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFormSkeletons;
