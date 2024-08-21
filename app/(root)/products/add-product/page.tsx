import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AddProductForm from "@/components/dialogs/AddProductForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;
  return (
    <section>
      <div>
        <AddProductForm userId={userId} />
      </div>
    </section>
  );
}

export default AddProductPage;
