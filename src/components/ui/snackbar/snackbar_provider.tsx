"use client";

import React, { PropsWithChildren, useReducer } from "react";

import { SnackbarAction, SnackbarType } from "@/data/types/ui/snackbar";
import { Snackbar } from "./snackbar";
import { SnackbarContext } from "./use_snackbar";

export const reducer = (
  state: { queue: SnackbarType[] },
  action: SnackbarAction
): {
  queue: SnackbarType[];
} => {
  switch (action.type) {
    case "ADD_SNACKBAR": {
      const { queue } = state;
      const { current } = action.payload;
      return {
        queue: [
          ...queue,
          { ...current, key: `${current.key}_${queue.length}` },
        ],
      };
    }
    case "REMOVE_SNACKBAR": {
      const { queue } = state;
      const { key: snackKey } = action.payload;
      return {
        queue: queue.filter((snackbar) => snackbar.key !== snackKey),
      };
    }
    default:
      throw new Error("Unknown action type");
  }
};

export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [{ queue }, dispatch] = useReducer(reducer, { queue: [] });

  return (
    <SnackbarContext.Provider value={{ queue, dispatch }}>
      {queue.map((snack, index) => (
        <Snackbar
          index={index}
          key={snack.key}
          icon={snack.icon}
          text={snack.text}
          variant={snack.variant}
          autoHideDuration={snack.timeout}
          handleClose={() =>
            dispatch({ type: "REMOVE_SNACKBAR", payload: { key: snack.key } })
          }
        />
      ))}
      {children}
    </SnackbarContext.Provider>
  );
};
