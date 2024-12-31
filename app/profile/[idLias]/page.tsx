import { Profile } from "@/components/profile/profile";
import { fetchUserFromIdlias } from "@/data/fetchers/users";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { idLias: string };
}) {
  const idLias = params.idLias;
  const user = await fetchUserFromIdlias(idLias);
  if (!user) {
    notFound();
  }
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
