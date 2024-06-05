import theme from "@/libs/theme/light";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

interface MuiProviderProps {
  children: ReactNode;
}

const MuiProvider = ({ children }: MuiProviderProps) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StyledEngineProvider>
);

export default MuiProvider;
