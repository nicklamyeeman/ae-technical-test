import { notFound } from "next/navigation";

import { Profile } from "@/components/profile/profile";
import { fetchUserFromIdlias, getUserFromToken } from "@/data/fetchers/users";

export default async function ProfilePage() {
  const userToken = await getUserFromToken();
  if (!userToken) {
    notFound();
  }
  const user = await fetchUserFromIdlias(userToken.id);
  if (!user) {
    notFound();
  }
  return <Profile user={user} />;
}
