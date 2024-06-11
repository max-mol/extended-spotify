import {
  PaletteColorOptions,
  SimplePaletteColorOptions,
  createTheme,
} from "@mui/material";

export const purple: SimplePaletteColorOptions = {
  main: "#ab34eb",
};

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

export default theme;
