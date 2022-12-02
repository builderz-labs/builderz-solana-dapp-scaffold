// A custom theme for this app

import { createTheme } from "@mui/material";
import { red, teal } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#eceff1',
      light: '#cfd8dc',
      dark: '#b2ebf2',
    },
    secondary: {
      main: '#69f0ae',
      light: '#1de9b6',
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
      main: '#eceff1',
      light: '#cfd8dc',
      dark: '#b2ebf2',
    },
    secondary: {
      main: '#69f0ae',
      light: '#1de9b6',
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