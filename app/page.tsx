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

  return <Home user={user} />;
}
