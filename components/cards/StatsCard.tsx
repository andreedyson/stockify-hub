type StatsCardProps = {
  title: string;
  amount: number;
  color: string;
  icon?: React.ReactNode;
};

function StatsCard({ title, amount, color, icon }: StatsCardProps) {
  return (
    <article className="bg-main-card rounded-md px-4 py-6 md:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <span className="text-xs font-medium uppercase text-desc">
            {title}
          </span>
          <p className="text-lg font-semibold tracking-wide lg:text-xl">
            {amount}{" "}
            <span className="text-base font-light">{title.split(" ")[1]}</span>
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
