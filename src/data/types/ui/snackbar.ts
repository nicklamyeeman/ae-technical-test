import React from "react";

export type SnackbarType = {
  key: string;
  text: React.ReactNode;
  variant: "success" | "error" | "warning" | "info";
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  timeout?: number;
};

export type SnackbarAction =
  | {
      type: "ADD_SNACKBAR";
      payload: { current: SnackbarType };
    }
  | {
      type: "REMOVE_SNACKBAR";
      payload: { key: string };
    };
