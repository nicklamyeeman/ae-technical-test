"use client";

import { Dialog } from "@/components/ui/dialog";
import React from "react";

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
