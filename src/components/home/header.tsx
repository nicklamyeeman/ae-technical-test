import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/assets/logo-light.png";
import { BaseUser } from "@/data/types/users";
import { HeaderMenu } from "./header_menu";

export const Header: React.FC<{ user: BaseUser | null }> = async ({ user }) => {
  return (
    <div className="w-full h-12 fixed top-0 left-0 flex items-center justify-center bg-stone-900 z-10 py-1 drop-shadow-md">
      <div className="w-full max-w-[1440px] flex items-center justify-between px-6">
        <Link href={"/"} className="relative w-10 h-10">
          <Image
            alt="logo"
            src={Logo}
            className="w-full h-full object-contain"
          />
        </Link>
        <div className="flex w-full gap-8 items-center justify-end">
          {!user ? (
            <Link href="/login" className="text-stone-50 no-underline">
              <span className="text-stone-50 font-medium tracking-wider bg-amber-500 rounded-2xl px-5 py-1.5 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                Login
              </span>
            </Link>
          ) : (
            <HeaderMenu user={user} />
          )}
        </div>
      </div>
    </div>
  );
};
