"use client";

import React, { useCallback, useState } from "react";

import { useSnackbar } from "@/components/ui/snackbar/use_snackbar";
import { Spinner } from "@/components/ui/spinner";
import { Pointer } from "@/data/types/pointing";
import { BaseUser } from "@/data/types/users";
import { fetchApi } from "@/data/utils/api";
import { sendMail } from "@/data/utils/send_mail";

export const CheckOutButton: React.FC<{
  user: BaseUser;
  disabled?: boolean;
}> = ({ user, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const addSnackbar = useSnackbar();

  const onCheckOut = useCallback(async () => {
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
        body: JSON.stringify({ type: "check-out", userId: user.id }),
      })
        .then(({ code }) =>
          sendMail({
            sendTo: user.email,
            subject: "Your check-out code",
            text: `Hello ${user.username},\nYour today check-out code is : ${code}`,
          })
        )
        .then(() =>
          addSnackbar({
            key: "code-sent",
            text: "Check-out code sent, check your email",
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
        Finished for today ?
      </span>
      <button
        disabled={disabled}
        className="disabled:opacity-40 flex w-full whitespace-nowrap items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-50 shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        onClick={onCheckOut}
      >
        Check-Out
        {loading && <Spinner className="ml-2" size={20} color="gray" />}
      </button>
    </div>
  );
};
