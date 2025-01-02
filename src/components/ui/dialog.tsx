"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Dialog: React.FC<
  PropsWithChildren<{ open: boolean; onClose: () => void; className?: string }>
> = ({ open, onClose, className, children }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCloseOnClick = (event: Event) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    window.addEventListener("click", handleCloseOnClick);
    return () => window.removeEventListener("click", handleCloseOnClick);
  }, [dialogRef]);

  useEffect(() => {
    const handleCloseOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleCloseOnEscape);
    return () => window.removeEventListener("keydown", handleCloseOnEscape);
  }, []);

  const dialogContent = (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={dialogRef}
        className={`${className} bg-white rounded-lg w-full p-4 max-w-6xl`}
      >
        {children}
      </div>
    </div>
  );

  return open
    ? createPortal(dialogContent, document.getElementById("modal-root")!)
    : null;
};
