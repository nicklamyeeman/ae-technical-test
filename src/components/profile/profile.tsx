"use client";

import { BaseUser } from "@/data/types/users";
import { fetchApi } from "@/data/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProfilePage({ userId }: { userId: string }) {
  const router = useRouter();
  const [data, setData] = useState<BaseUser | null>(null);

  const getUserDetails = useCallback(
    () =>
      fetchApi<BaseUser>(`/users/profile/${userId}`).then((res) =>
        setData(res)
      ),
    [userId]
  );

  useEffect(() => {
    fetchApi<BaseUser>(`/users/profile/${userId}`).then((res) => setData(res));
  }, [userId]);

  return (
    <div>
      <h1>Profile</h1>
      {userId}
      <h2>{!data ? "Nothing" : JSON.stringify(data)}</h2>
      <button onClick={getUserDetails}>Details</button>
    </div>
  );
}
