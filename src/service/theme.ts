import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    // type: "light",
    primary: {
      main: "#75A1DE",
    },
    secondary: {
      main: "#d7d7d7",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121821",
    },
  },
});
