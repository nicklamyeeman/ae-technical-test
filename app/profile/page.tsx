import { notFound } from "next/navigation";

import { Profile } from "@/components/profile/profile";
import {
  fetchUserFromIdlias,
  fetchUserRole,
  getUserFromToken,
} from "@/data/fetchers/users";
import { UserRoles } from "@/data/types/users";

export default async function ProfilePage() {
  const userToken = await getUserFromToken();
  if (!userToken) {
    notFound();
  }
  const user = await fetchUserFromIdlias(userToken.id);
  if (!user) {
    notFound();
  }
  const userRole = await fetchUserRole(user.id);
  return <Profile user={user} isSelf isAdmin={userRole === UserRoles.ADMIN} />;
}
