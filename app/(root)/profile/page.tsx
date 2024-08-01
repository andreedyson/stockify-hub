import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditProfileForm from "@/components/forms/EditProfileForm";

async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login"); // Redirect to login page
  }

  const user = session.user;

  return (
    <div>
      <EditProfileForm id={user.id} />
    </div>
  );
}

export default ProfilePage;
