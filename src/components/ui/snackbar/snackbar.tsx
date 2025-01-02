"use client";

import React, { useEffect } from "react";

import { SnackbarType } from "@/data/types/ui/snackbar";

const variants = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

export const Snackbar: React.FC<
  Omit<SnackbarType, "key"> & {
    index: number;
    handleClose: () => void;
    autoHideDuration?: number;
  }
> = ({
  text,
  icon: Icon,
  variant,
  index,
  handleClose,
  autoHideDuration = 6000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, autoHideDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [autoHideDuration, handleClose]);

  return (
    <div
      className="absolute left-4"
      style={{
        bottom: `${index * 3 + 1}rem`,
      }}
    >
      <div
        className={`${variants[variant]} flex min-w-[280px] items-center truncate whitespace-nowrap rounded-lg py-3 px-3.5 text-sm text-stone-50 shadow-md`}
      >
        {Icon && (
          <span className="mr-4 text-base" aria-hidden="true">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <span>{text}</span>
        <button
          className="ml-auto bg-transparent !p-0 text-current"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
