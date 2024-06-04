import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  Theme
} from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  buttonSx?: SxProps<Theme>;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: MuiButtonProps["variant"];
}

const Button = ({ buttonSx, children, onClick, variant }: ButtonProps) => {
  return (
    <MuiButton variant={variant} onClick={onClick} sx={{ ...buttonSx }}>
      {children}
    </MuiButton>
  );
};

export default Button;
