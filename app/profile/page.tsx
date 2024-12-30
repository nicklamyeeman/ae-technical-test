import ProfilePage from "@/components/profile/profile";
import { getUserFromToken } from "@/data/fetchers/users";
import { notFound } from "next/navigation";

export default async function Profile() {
  const user = await getUserFromToken();
  if (!user) {
    notFound();
  }
  return (
    <div>
      <ProfilePage userId={user.id} />
    </div>
  );
}
