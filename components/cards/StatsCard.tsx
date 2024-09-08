import { Blocks, Container, Package, Receipt } from "lucide-react";

type StatsCardProps = {
  title: string;
  amount: number;
  color: string;
};

function StatsCard({ title, amount, color }: StatsCardProps) {
  const icon =
    title === "Products" ? (
      <Package size={28} />
    ) : title === "Inventories" ? (
      <Container size={28} />
    ) : title === "Categories" ? (
      <Blocks size={28} />
    ) : (
      <Receipt size={28} />
    );

  return (
    <article className="bg-main-card rounded-md px-4 py-6 md:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <span className="desc-2 text-xs font-medium uppercase">
            Total {title}
          </span>
          <p className="text-lg font-semibold tracking-wide lg:text-2xl">
            {amount} <span className="text-base font-semibold">{title}</span>
          </p>
        </div>
        <div
          className="rounded-full p-4"
          style={{
            color: `rgb(${color})`,
            backgroundColor: `rgba(${color}, 0.2)`,
          }}
        >
          {icon}
        </div>
      </div>
    </article>
  );
}

export default StatsCard;
