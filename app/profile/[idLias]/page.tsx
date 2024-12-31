import { Profile } from "@/components/profile/profile";
import { fetchUserFromIdlias } from "@/data/fetchers/users";
import { notFound } from "next/navigation";

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
  return <Profile user={user} />;
}
