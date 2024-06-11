import {
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material";

interface SnackbarProps {
  open: boolean;
  children?: MuiSnackbarProps["children"];
  autoHideDuration?: MuiSnackbarProps["autoHideDuration"];
  onClose?: () => void;
}

const Snackbar = ({
  open,
  autoHideDuration,
  onClose,
  children,
}: SnackbarProps) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </MuiSnackbar>
  );
};

export default Snackbar;
