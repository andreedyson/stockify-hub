import { formatDate } from "@/lib/utils";
import { InventoryCardType } from "@/types";
import Image from "next/image";
import Link from "next/link";

type InventoryCardProps = {
  inventoryData: InventoryCardType;
};

function InventoryCard({ inventoryData }: InventoryCardProps) {
  return (
    <Link href={`/inventory/${inventoryData.id}`}>
      <article
        className="bg-main-card relative overflow-hidden rounded-md px-2 py-4 sm:px-4 sm:py-6"
        style={{ borderRight: `4px solid ${inventoryData.color}` }}
      >
        <div className="absolute -right-4 top-0">
          <Image
            src={"/assets/inv-card-decor.svg"}
            height={0}
            width={0}
            alt="Card Decor"
            priority
            className="h-[90px] w-[150px] invert dark:invert-0"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-semibold text-desc">Name</span>
            <p className="line-clamp-1 text-lg font-bold">
              {inventoryData.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col font-semibold">
              <span className="text-xs text-desc">Created</span>
              <span className="text-sm">
                {formatDate(inventoryData.createdAt)}
              </span>
            </div>
            <div className="flex flex-col font-semibold">
              <span className="text-xs text-desc">Last Update</span>
              <span className="text-sm">
                {formatDate(inventoryData.updatedAt)}
              </span>
            </div>
            <div className="flex flex-col font-semibold">
              <span className="text-xs text-desc">Members</span>
              <span className="text-sm">{inventoryData.memberCount}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default InventoryCard;
