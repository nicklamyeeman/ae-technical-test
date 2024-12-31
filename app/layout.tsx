import { Footer } from "@/components/home/footers";
import { Header } from "@/components/home/header";
import { getUserFromToken } from "@/data/fetchers/users";
import "@/data/mongodb/config";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGE - Pointing App",
  description: "Austral Groupe Energies Pointing App for employees",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromToken();

  return (
    <html lang="en" className="w-full min-h-screen h-full">
      <body className="w-full h-auto m-0 p-0 custom-scrollbar">
        <header>
          <Header user={user} />
        </header>
        <main className="font-sans min-w-screen w-full min-h-screen h-full relative flex flex-col items-center bg-gradient-to-br from-stone-50 to-violet-50">
          <div id="modal-root"></div>
          <div className="flex flex-col max-w-[1440px] w-full py-4 pt-14">
            {children}
          </div>
        </main>
        <footer className="w-full flex flex-col">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
