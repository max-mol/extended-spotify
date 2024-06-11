import { Alert, AlertProps } from "@mui/material";
import Snackbar from "./Snackbar";

interface AlertSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: AlertProps["severity"];
}

const AlertSnackbar = ({
  open,
  onClose,
  message,
  severity,
}: AlertSnackbarProps) => {
  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={6000}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
