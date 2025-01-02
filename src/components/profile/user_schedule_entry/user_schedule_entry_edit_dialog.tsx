"use client";

import React from "react";

import { Dialog } from "@/components/ui/dialog";

export const UserScheduleEntryEditDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      CECI EST UNE DIALOG
    </Dialog>
  );
};
