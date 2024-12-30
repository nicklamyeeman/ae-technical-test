import ProfilePage from "@/components/profile/profile";
import { getUserIdFromToken } from "@/data/fetchers/users";
import { notFound } from "next/navigation";

export default async function Profile() {
  const userId = await getUserIdFromToken();
  if (!userId) {
    notFound();
  }
  return (
    <div>
      <ProfilePage userId={userId} />
    </div>
  );
}
