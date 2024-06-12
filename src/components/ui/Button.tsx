import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  SxProps,
  Theme,
} from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  buttonProps?: Partial<MuiButtonProps>;
  buttonSx?: SxProps<Theme>;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: MuiButtonProps["variant"];
}

const Button = ({
  buttonSx,
  children,
  onClick,
  variant,
  buttonProps,
}: ButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      onClick={onClick}
      sx={{ ...buttonSx }}
      {...buttonProps}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
