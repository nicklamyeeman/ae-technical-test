"use client";
import React, { MouseEvent, useCallback, useState } from "react";

import { AvatarIcon } from "@/assets/icons/avatar";
import { ChevronDownIcon } from "@/assets/icons/chevron-down";
import { BaseUser } from "@/data/types/users";
import Link from "next/link";
import { LogoutButton } from "../auth/logout";
import { Dropdown } from "../ui/dropdown";

const OnlineUserHeaderMenu: React.FC<{
  user: BaseUser;
  open: boolean;
  onClose: () => void;
}> = ({ user, open, onClose }) => {
  return (
    <Dropdown open={open} onClose={onClose} className="top-8">
      <span className="text-stone-400 whitespace-nowrap mx-4 text-sm">
        Logged in as
        <span className="text-amber-500 font-medium ml-1">{user.username}</span>
      </span>
      <div className="w-full flex hover:bg-stone-200">
        <Link href="/profile">
          <span className="text-stone-900 whitespace-nowrap flex items-center gap-4 justify-between">
            <AvatarIcon className="w-5 h-5 aspect-square shrink-0 [&>svg]:text-stone-900 bg-opacity-0" />
            Profile
          </span>
        </Link>
      </div>
      <div className="w-full flex hover:bg-stone-200">
        <LogoutButton />
      </div>
    </Dropdown>
  );
};

export const HeaderMenu: React.FC<{ user: BaseUser }> = ({ user }) => {
  const [openMenu, setMenuOpen] = useState(false);

  const handleOpenMenu = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((openState) => !openState);
  }, []);

  return (
    <div className="relative">
      <OnlineUserHeaderMenu
        user={user}
        open={openMenu}
        onClose={() => setMenuOpen(false)}
      />
      <button
        onClick={handleOpenMenu}
        className="text-stone-50 no-underline flex items-center gap-2"
      >
        <AvatarIcon className="w-6 h-6 [&>svg]:text-stone-50 !bg-amber-500" />
        <ChevronDownIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
