"use client";

import { Pointer } from "@/data/types/pointing";
import { BaseUser } from "@/data/types/users";
import { sendMail } from "@/data/utils/send_mail";
import { fetchApi } from "@/data/utils/utils";
import { useCallback } from "react";

export const GetCode: React.FC<{
  user: BaseUser | null;
}> = ({ user }) => {
  const onClick = useCallback(async () => {
    if (!user) {
      return;
    }
    const { code } = await fetchApi<Pointer>("/pointing/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "check-in", userId: user.id }),
    });
    sendMail({
      sendTo: user.email,
      subject: "Votre code de pointage",
      text: `Bonjour ${user.username},\nVotre code de pointage est le suivant : ${code}`,
    });
  }, [JSON.stringify(user)]);

  return (
    <div>
      <h1>Code</h1>

      <button onClick={onClick}>get my code</button>
    </div>
  );
};
