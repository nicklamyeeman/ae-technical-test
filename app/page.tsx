import { GetCode } from "@/components/home/get_code";
import { Logout } from "@/components/home/logout";
import { ValidateCode } from "@/components/home/validate_code";
import { getUserFromToken } from "@/data/fetchers/users";

export default async function Home() {
  const user = await getUserFromToken();

  //timezoneid IANA pour UTC+4
  const date = new Date().toLocaleDateString("fr-FR", {
    timeZone: "Indian/Reunion",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {date}
      <br />
      {user?.username}
      <GetCode user={user} />
      <Logout />
      <ValidateCode user={user} />
    </div>
  );
}
