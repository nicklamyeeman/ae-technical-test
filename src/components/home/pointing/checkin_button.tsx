"use client";

import React, { useCallback } from "react";

import { Pointer } from "@/data/types/pointing";
import { BaseUser } from "@/data/types/users";
import { fetchApi } from "@/data/utils/api";
import { sendMail } from "@/data/utils/send_mail";

export const CheckInButton: React.FC<{ user: BaseUser }> = ({ user }) => {
  const onCheckIn = useCallback(async () => {
    try {
      const { code } = await fetchApi<Pointer>("/pointing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "check-in", userId: user.id }),
      });
      sendMail({
        sendTo: user.email,
        subject: "Your check-in code",
        text: `Hello ${user.username},\nYour today check-in code is : ${code}`,
      });
    } catch (error: any) {
      console.error("Check-In failed", error.message);
    }
  }, [JSON.stringify(user)]);

  return (
    <div>
      <span>Start your work shift</span>
      <button onClick={onCheckIn}>Check-In</button>
    </div>
  );
};
