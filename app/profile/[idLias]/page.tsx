import { notFound } from "next/navigation";

import { Profile } from "@/components/profile/profile";
import {
  fetchUserFromIdlias,
  fetchUserRole,
  getUserFromToken,
} from "@/data/fetchers/users";
import { UserRoles } from "@/data/types/users";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ idLias: string }>;
}) {
  const idLias = (await params).idLias;
  const user = await fetchUserFromIdlias(idLias);
  if (!user) {
    notFound();
  }
  const connectedUser = await getUserFromToken();
  const connectedUserRole = await fetchUserRole(connectedUser?.id ?? null);

  return (
    <Profile
      user={user}
      isSelf={connectedUser?.id === user?.id}
      isAdmin={connectedUserRole === UserRoles.ADMIN}
    />
  );
}
