"use client";

import React, { MouseEvent, useCallback, useState } from "react";

import { DeleteIcon } from "@/assets/icons/delete";
import { DotsVerticalIcon } from "@/assets/icons/dots-vertical";
import { EditIcon } from "@/assets/icons/edit";
import { Dropdown } from "@/components/ui/dropdown";
import { UserScheduleEntryDeleteDialog } from "./user_schedule_entry_delete_dialog";
import { UserScheduleEntryEditDialog } from "./user_schedule_entry_edit_dialog";

const UserScheduleEntryMenu: React.FC<{
  open: boolean;
  onClose: () => void;
  userId: string;
  entryId: string;
}> = ({ open, onClose, userId, entryId }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenEditDialog = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onClose();
    setEditDialogOpen((openState) => !openState);
  }, []);

  const handleOpenDeleteDialog = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onClose();
    setDeleteDialogOpen((openState) => !openState);
  }, []);

  return (
    <>
      <UserScheduleEntryEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
      <UserScheduleEntryDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        userId={userId}
        entryId={entryId}
      />
      <Dropdown open={open} onClose={onClose} className="top-8 z-10">
        <div className="w-full flex hover:bg-stone-200">
          <button
            onClick={handleOpenEditDialog}
            className="text-stone-900 whitespace-nowrap flex items-center gap-2 justify-between"
          >
            <EditIcon className="w-5 h-5 aspect-square shrink-0 [&>svg]:text-stone-900 bg-opacity-0" />
            Edit
          </button>
        </div>
        <div className="w-full flex hover:bg-stone-200">
          <button
            onClick={handleOpenDeleteDialog}
            className="text-stone-900 whitespace-nowrap flex items-center gap-2 justify-between"
          >
            <DeleteIcon className="w-5 h-5 aspect-square shrink-0 [&>svg]:text-stone-900 bg-opacity-0" />
            Delete
          </button>
        </div>
      </Dropdown>
    </>
  );
};

export const UserScheduleEntryMenuButton: React.FC<{
  userId: string;
  entryId: string;
}> = ({ userId, entryId }) => {
  const [openMenu, setMenuOpen] = useState(false);

  const handleOpenMenu = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((openState) => !openState);
  }, []);

  return (
    <div className="relative">
      <UserScheduleEntryMenu
        open={openMenu}
        onClose={() => setMenuOpen(false)}
        userId={userId}
        entryId={entryId}
      />
      <button
        onClick={handleOpenMenu}
        className="aspect-auto w-6 h-6 flex items-center rounded-md bg-stone-50/30 hover:bg-stone-50/50"
      >
        <DotsVerticalIcon className="text-stone-900 w-6 h-6" />
      </button>
    </div>
  );
};
