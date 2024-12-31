"use client";

import { BaseUser } from "@/data/types/users";
import { fetchApi } from "@/data/utils/api";
import { useCallback, useState } from "react";

export const ValidateCode: React.FC<{
  user: BaseUser | null;
}> = ({ user }) => {
  const [code, setCode] = useState<string>("");

  const onClick = useCallback(async () => {
    if (!user) {
      return;
    }
    const data = await fetchApi<any>("/pointing/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId: user.id }),
    });
  }, [JSON.stringify(user), code]);

  return (
    <div>
      <h1>Validate Code</h1>
      <input
        id="code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={onClick}>validate my code</button>
    </div>
  );
};
