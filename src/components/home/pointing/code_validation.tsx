"use client";

import React, { useCallback, useState } from "react";

import { fetchApi } from "@/data/utils/api";

export const CodeValidation: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const [code, setCode] = useState<string>("");

  const onValidateCode = useCallback(async () => {
    try {
      await fetchApi("/pointing/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, userId }),
      });
    } catch (error: any) {
      console.error("Validation failed", error.message);
    }
  }, [userId, code]);

  return (
    <div>
      <span>Validate Code</span>
      <input
        id="code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={onValidateCode}>Validate my code</button>
    </div>
  );
};
