import { createContext, useCallback, useContext } from "react";

import { SnackbarAction, SnackbarType } from "@/data/types/ui/snackbar";

export const SnackbarContext = createContext<{
  queue: SnackbarType[];
  dispatch: React.Dispatch<SnackbarAction>;
}>({
  queue: [] as SnackbarType[],
  dispatch: () => {},
});

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar was called outside of SnackbarProvider");
  }
  const { dispatch } = context;
  return useCallback(
    (snack: SnackbarType) => {
      dispatch({ type: "ADD_SNACKBAR", payload: { current: snack } });
    },
    [dispatch]
  );
};
