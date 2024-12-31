import { Home } from "@/components/home/home";
import { getUserFromToken } from "@/data/fetchers/users";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Pointing App";
  const description = "Pointing App for employees of Austral Groupe Energies";

  return {
    title,
    description,
    metadataBase: new URL("https://lamyeeman.com/"),
    alternates: {
      canonical: "https://lamyeeman.com",
    },
    openGraph: {
      title,
      description,
      url: "https://lamyeeman.com",
    },
    twitter: {
      card: "summary_large_image" as any,
      title,
      description,
      site: "@nickauteen",
    },
  };
}

export default async function HomePage() {
  const user = await getUserFromToken();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Home user={user} />
    </div>
  );
}
