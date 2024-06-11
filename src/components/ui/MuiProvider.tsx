import theme from "@/libs/theme/light";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import SnackbarProvider from "./SnackbarProvider";

interface MuiProviderProps {
  children: ReactNode;
}

const MuiProvider = ({ children }: MuiProviderProps) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

export default MuiProvider;
