import { formatDate } from "@/lib/utils";
import Link from "next/link";

type InventoryCardProps = {
  userData: {
    id: string;
    name: string;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
    memberCount?: number;
  };
};

function InventoryCard({ userData }: InventoryCardProps) {
  return (
    <Link href={`/inventory/${userData.id}`}>
      <article
        className="bg-main-card rounded-md px-2 py-4 sm:px-4 sm:py-6"
        style={{ borderRight: `4px solid ${userData.color}` }}
      >
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-semibold text-desc">Name</span>
            <p className="text-lg font-bold">{userData.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col font-semibold">
              <span className="text-xs text-desc">Created</span>
              <span className="text-sm">{formatDate(userData.createdAt)}</span>
            </div>
            <div className="flex flex-col font-semibold">
              <span className="text-xs text-desc">Last Update</span>
              <span className="text-sm">{formatDate(userData.updatedAt)}</span>
            </div>
            <div className="flex flex-col font-semibold">
              <span className="text-xs text-desc">Members</span>
              <span className="text-sm">{userData.memberCount}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default InventoryCard;
