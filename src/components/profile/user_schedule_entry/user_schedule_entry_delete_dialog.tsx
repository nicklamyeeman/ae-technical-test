"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { DeleteIcon } from "@/assets/icons/delete";
import { Dialog } from "@/components/ui/dialog";
import { useSnackbar } from "@/components/ui/snackbar/use_snackbar";
import { Spinner } from "@/components/ui/spinner";
import { fetchApi } from "@/data/utils/api";

export const UserScheduleEntryDeleteDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  userId: string;
  entryId: string;
}> = ({ open, onClose, userId, entryId }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const addSnackbar = useSnackbar();

  const handleDeleteUserScheduleEntry = useCallback(async () => {
    if (!userId || !entryId) {
      return;
    }
    try {
      setLoading(true);
      await fetchApi("/user/schedule/entry", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, entryId }),
      }).then(() => {
        addSnackbar({
          key: "success",
          text: "User schedule entry deleted successfully",
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
      setLoading(false);
    }
  }, [userId, entryId, router]);

  return (
    <Dialog open={open} onClose={onClose} className="!max-w-md">
      <div className="w-full flex flex-col gap-2 mb-6">
        <span className="font-semibold text-lg text-stone-900">
          This action cannot be undone
        </span>
        <p className="text-stone-500 text-sm mt-1">
          Are you sure you want to delete this schedule entry ?
        </p>
      </div>
      <div className="flex gap-2 w-full justify-end">
        <button
          onClick={onClose}
          className="disabled:opacity-40 flex w-full sm:w-fit whitespace-nowrap items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-amber-500 shadow-sm hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteUserScheduleEntry}
          className="disabled:opacity-40 flex w-full sm:w-fit whitespace-nowrap items-center justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-50 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Confirm deletion
          {loading ? (
            <Spinner className="ml-2" size={20} color="gray" />
          ) : (
            <DeleteIcon className="ml-2 w-5 h-5" />
          )}
        </button>
      </div>
    </Dialog>
  );
};
