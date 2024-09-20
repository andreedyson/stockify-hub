import { Skeleton } from "../ui/skeleton";

function TransactionFormSkeletons() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full max-w-[150px]" />
        <Skeleton className="h-4 w-full max-w-[300px]" />
      </div>

      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-3 w-full max-w-[100px]" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}

      <div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

export default TransactionFormSkeletons;
