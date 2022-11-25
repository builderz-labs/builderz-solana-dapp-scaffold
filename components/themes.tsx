// A custom theme for this app

import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: "#fff",
    // }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: "#fff",
    // }
  },
});

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export default themes;
