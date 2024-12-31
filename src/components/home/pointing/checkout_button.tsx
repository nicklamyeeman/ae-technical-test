"use client";

import React, { useCallback } from "react";

import { Pointer } from "@/data/types/pointing";
import { BaseUser } from "@/data/types/users";
import { fetchApi } from "@/data/utils/api";
import { sendMail } from "@/data/utils/send_mail";

export const CheckOutButton: React.FC<{ user: BaseUser }> = ({ user }) => {
  const onCheckOut = useCallback(async () => {
    try {
      const { code } = await fetchApi<Pointer>("/pointing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "check-out", userId: user.id }),
      });
      sendMail({
        sendTo: user.email,
        subject: "Your check-out code",
        text: `Hello ${user.username},\nYour today check-out code is : ${code}`,
      });
    } catch (error: any) {
      console.error("Check-Out failed", error.message);
    }
  }, [JSON.stringify(user)]);

  return (
    <div>
      <span>Finished for today ?</span>
      <button onClick={onCheckOut}>Check-Out</button>
    </div>
  );
};
