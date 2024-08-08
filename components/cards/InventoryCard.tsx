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
        <div className="absolute -right-4 -top-4">
          <Image
            src={"/assets/inv-card-decor.svg"}
            height={100}
            width={150}
            alt="Card Decor"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-semibold text-desc">Name</span>
            <p className="text-lg font-bold">{inventoryData.name}</p>
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
