"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { useSnackbar } from "@/components/ui/snackbar/use_snackbar";
import { Spinner } from "@/components/ui/spinner";
import { fetchApi } from "@/data/utils/api";

export const CodeValidation: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const addSnackbar = useSnackbar();

  const onValidateCode = useCallback(async () => {
    if (!code || !userId) {
      return;
    }
    try {
      setLoading(true);
      await fetchApi("/pointing/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, userId }),
      }).then(() => {
        addSnackbar({
          key: "success",
          text: "Code validated successfully",
          variant: "success",
        });
        router.refresh();
      });
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
      setCode("");
      setLoading(false);
    }
  }, [userId, code, router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onValidateCode();
      }}
      className="flex flex-col sm:flex-row gap-2 w-full"
    >
      <input
        id="code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="block w-full rounded-md bg-stone-50/15 py-1.5 px-2 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-500/10 sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        disabled={!code}
        className="disabled:opacity-40 flex w-full sm:w-fit whitespace-nowrap items-center justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-50 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
      >
        Validate my code
        {loading && <Spinner className="ml-2" size={20} color="gray" />}
      </button>
    </form>
  );
};
