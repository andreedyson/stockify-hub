import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import EditProductForm from "@/components/forms/EditProductForm";
import { getProductById } from "@/server/product";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function EditProductPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;
  const productDetails = await getProductById(userId, id);

  return (
    <div>
      <EditProductForm
        userId={userId}
        product={productDetails}
        inventoryId={productDetails.inventoryId}
      />
    </div>
  );
}

export default EditProductPage;
