"use client";

import { useCallback } from "react";

export const Logout = () => {
  const logout = useCallback(async () => {
    try {
      await fetch("/api/users/logout");
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);
  return <button onClick={logout}>Logout</button>;
};
