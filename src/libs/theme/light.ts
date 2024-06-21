import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[700],
    },
    secondary: {
      main: purple[50],
    },
  },
});

export default theme;
