import { cn } from "@/lib/utils";
import { Status } from "@prisma/client";
import { BadgeCheck, Ban, Hourglass, Loader } from "lucide-react";

function StatusBadge({ status }: { status: Status }) {
  const textStyle =
    status === "PENDING"
      ? "text-orange-500"
      : status === "IN_PROGRESS"
        ? "text-blue-500"
        : status === "COMPLETED"
          ? "text-green-500"
          : "text-red-500";

  const bgStyle =
    status === "PENDING"
      ? "bg-orange-500/40"
      : status === "IN_PROGRESS"
        ? "bg-blue-500/40"
        : status === "COMPLETED"
          ? "bg-green-500/40"
          : "bg-red-500/40";

  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 rounded-full px-3 py-2",
        bgStyle,
        textStyle,
      )}
    >
      <div>
        {status === "PENDING" ? (
          <Hourglass size={20} />
        ) : status === "IN_PROGRESS" ? (
          <Loader size={20} />
        ) : status === "COMPLETED" ? (
          <BadgeCheck size={20} />
        ) : (
          <Ban size={20} />
        )}
      </div>
      <p className="text-xs font-semibold">{status.split("_").join(" ")}</p>
    </div>
  );
}

export default StatusBadge;
