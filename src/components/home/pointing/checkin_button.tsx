"use client";

import React, { useCallback, useState } from "react";

import { useSnackbar } from "@/components/ui/snackbar/use_snackbar";
import { Spinner } from "@/components/ui/spinner";
import { Pointer } from "@/data/types/pointing";
import { BaseUser } from "@/data/types/users";
import { fetchApi } from "@/data/utils/api";
import { sendMail } from "@/data/utils/send_mail";

export const CheckInButton: React.FC<{ user: BaseUser }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const addSnackbar = useSnackbar();

  const onCheckIn = useCallback(async () => {
    if (!user) {
      return;
    }
    try {
      setLoading(true);
      await fetchApi<Pointer>("/pointing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "check-in", userId: user.id }),
      })
        .then(({ code }) =>
          sendMail({
            sendTo: user.email,
            subject: "Your check-in code",
            text: `Hello ${user.username},\nYour today check-in code is : ${code}`,
          })
        )
        .then(() =>
          addSnackbar({
            key: "code-sent",
            text: "Check-in code sent, check your email",
            variant: "info",
          })
        );
    } catch (error: any) {
      if (typeof error === "string") {
        addSnackbar({
          key: "error",
          text: error,
          variant: "error",
        });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(user)]);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <span className="w-full text-stone-600 text-xs">
        Start your work shift
      </span>
      <button
        className="disabled:opacity-40 flex w-full whitespace-nowrap items-center justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-50 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        onClick={onCheckIn}
      >
        Check-In
        {loading && <Spinner className="ml-2" size={20} color="gray" />}
      </button>
    </div>
  );
};
