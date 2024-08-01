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
      <EditProfileForm
        email={user.email as string}
        fullname={user.name as string}
        profile_photo={user.image as string}
        createdAt={user.createdAt as Date}
      />
    </div>
  );
}

export default ProfilePage;
