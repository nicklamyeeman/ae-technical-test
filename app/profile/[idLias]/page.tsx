import ProfilePage from "@/components/profile/profile";

export default function Profile({ params }: { params: { idLias: string } }) {
  const userId = params.idLias;
  return (
    <div>
      <ProfilePage userId={userId} />
    </div>
  );
}
