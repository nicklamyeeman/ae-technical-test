import Image from "next/image";
import Link from "next/link";
import React from "react";

// @ts-ignore
import Logo from "@/assets/logo-light.png";

import { BaseUser } from "@/data/types/users";
import { LogoutButton } from "../auth/logout";

export const Header: React.FC<{ user: BaseUser | null }> = async ({ user }) => {
  return (
    <div className="w-full h-12 fixed top-0 left-0 flex items-center justify-center bg-stone-900 z-10 py-1 drop-shadow-md">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        <Link href={"/"} className="relative w-10 h-10">
          <Image
            alt="logo"
            src={Logo}
            className="w-full h-full object-contain"
          />
        </Link>
        <div className="flex w-full gap-8 items-center justify-end">
          <Link href="/" className="text-stone-50 no-underline">
            <span className="text-white font-semibold tracking-wider">
              Home
            </span>
          </Link>
          <Link href="/profile" className="text-stone-50 no-underline">
            <span className="text-white font-semibold tracking-wider">
              Profile
            </span>
          </Link>
          {!user ? (
            <>
              <Link href="/login" className="text-stone-50 no-underline">
                <span className="text-white font-semibold tracking-wider">
                  Login
                </span>
              </Link>
              <Link href="/register" className="text-stone-50 no-underline">
                <span className="text-white font-semibold tracking-wider">
                  Register
                </span>
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </div>
  );
};
