"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

import { LogoutIcon } from "@/assets/icons/logout";
import { fetchApi } from "@/data/utils/api";

export const LogoutButton: React.FC = () => {
  const router = useRouter();
  const onLogout = useCallback(async () => {
    try {
      await fetchApi("/auth/logout", { method: "POST" }).then(() => {
        router.replace("/");
        router.refresh();
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }, [router]);
  return (
    <button
      className="text-stone-900 whitespace-nowrap flex items-center gap-4 justify-between"
      onClick={onLogout}
    >
      <LogoutIcon className="w-5 h-5 aspect-square shrink-0 text-stone-900" />
      Logout
    </button>
  );
};
