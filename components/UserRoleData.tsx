import { currentUserInventoriesRolesType } from "@/types/server/inventory";
import UserRolesList from "./list/UserRolesList";
import Image from "next/image";

type UserRolesDataType = {
  userRoleData: currentUserInventoriesRolesType[];
};

function UserRoleData({ userRoleData }: UserRolesDataType) {
  return (
    <>
      {userRoleData.length ? (
        <div className="grid grid-cols-1 gap-3 sm:max-md:grid-cols-2">
          {userRoleData.map((user) => (
            <UserRolesList key={user.userId} userData={user} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-4 text-center">
          <Image
            src={"/assets/user-role-empty.svg"}
            width={200}
            height={400}
            alt="User Roles Not Found"
            className="size-full"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              You don&apos;t have any roles
            </h4>
            <p className="text-[10px] text-desc md:text-sm">
              You are not part of an inventory yet.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserRoleData;
