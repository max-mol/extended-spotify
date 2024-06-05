import { PaletteColorOptions, createTheme } from "@mui/material";

const purple: PaletteColorOptions = {
  main: "#ab34eb",
};

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

export default theme;
