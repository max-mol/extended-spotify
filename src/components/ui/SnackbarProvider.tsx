import { AlertProps } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";
import AlertSnackbar from "./AlertSnackbar";

export type SnackbarType = {
  open: boolean;
  severity: AlertProps["severity"];
  message: string;
};

export const DEFAULT_SNACKBAR_VALUE: SnackbarType = {
  open: false,
  severity: "error",
  message: "",
};

type SnackbarContextValue = {
  enqueueSnackbar: (severity: AlertProps["severity"], message: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
  enqueueSnackbar: (severity, color) => {},
});

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarData, setSnackbarData] = useState<SnackbarType>(
    DEFAULT_SNACKBAR_VALUE
  );

  const handleCloseSnackbar = () => {
    setSnackbarData((oldState) => ({ ...oldState, open: false }));
  };

  const enqueueSnackbar = (
    severity: AlertProps["severity"],
    message: string
  ) => {
    setSnackbarData({
      severity: severity,
      message: message,
      open: true,
    });
  };

  return (
    <>
      <AlertSnackbar
        open={snackbarData.open}
        onClose={handleCloseSnackbar}
        severity={snackbarData.severity}
        message={snackbarData.message}
      />
      <SnackbarContext.Provider value={{ enqueueSnackbar }}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export default SnackbarProvider;
