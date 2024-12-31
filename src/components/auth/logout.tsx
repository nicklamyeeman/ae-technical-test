"use client";

import { fetchApi } from "@/data/utils/api";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export const LogoutButton: React.FC = () => {
  const router = useRouter();
  const onLogout = useCallback(async () => {
    try {
      await fetchApi("/auth/logout").then(() => router.push("/"));
    } catch (error: any) {
      console.error(error.message);
    }
  }, [router]);
  return (
    <button
      className="text-white font-semibold tracking-wider"
      onClick={onLogout}
    >
      Logout
    </button>
  );
};
