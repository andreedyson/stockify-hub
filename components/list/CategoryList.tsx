import { getTotalCategoryProducts } from "@/server/category";
import { Category } from "@prisma/client";
import CategoryAction from "./CategoryAction";

type CategoryListProps = {
  data: Category;
  userRole: string;
};

async function CategoryList({ data, userRole }: CategoryListProps) {
  const total = await getTotalCategoryProducts(data.id);

  return (
    <article>
      <div className="flex items-center justify-between py-2">
        <p className="font-semibold">
          {data.name} (
          <span className="text-sm font-light">{total} Products</span>)
        </p>
        {userRole !== "USER" && <CategoryAction category={data} />}
      </div>
    </article>
  );
}

export default CategoryList;
