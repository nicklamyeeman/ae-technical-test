"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

export const Dropdown: React.FC<
  PropsWithChildren<{ open: boolean; onClose: () => void; className?: string }>
> = ({ open, onClose, className, children }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCloseOnClick = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    window.addEventListener("click", handleCloseOnClick);
    return () => window.removeEventListener("click", handleCloseOnClick);
  }, [dropdownRef]);

  useEffect(() => {
    const handleCloseOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleCloseOnEscape);
    return () => window.removeEventListener("keydown", handleCloseOnEscape);
  }, []);

  return open ? (
    <div
      ref={dropdownRef}
      className={`origin-top-right absolute right-0 [&>div]:px-4 [&>div]:py-1.5 gap-1 flex flex-col py-1.5 rounded-sm shadow-md shadow-stone-200 bg-stone-50 ring-1 ring-stone-900 ring-opacity-5 ${className}`}
    >
      {children}
    </div>
  ) : null;
};
