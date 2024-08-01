import { formatDate } from "@/lib/utils";

type InventoryCardProps = {
  data: {
    id: string;
    name: string;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

function InventoryCard({ data }: InventoryCardProps) {
  return (
    <article
      className="rounded-md border-l bg-accent px-2 py-4 sm:px-4 sm:py-6"
      style={{ borderLeft: `4px solid ${data.color}` }}
    >
      <div className="flex flex-col gap-5">
        <div>
          <span className="text-xs font-semibold text-desc">Name</span>
          <p className="text-lg font-bold">{data.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col font-semibold">
            <span className="text-xs text-desc">Created</span>
            <span className="text-sm">{formatDate(data.createdAt)}</span>
          </div>
          <div className="flex flex-col font-semibold">
            <span className="text-xs text-desc">Last Update</span>
            <span className="text-sm">{formatDate(data.updatedAt)}</span>
          </div>
          <div className="flex flex-col font-semibold">
            <span className="text-xs text-desc">Members</span>
            <span className="text-sm">3</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default InventoryCard;
