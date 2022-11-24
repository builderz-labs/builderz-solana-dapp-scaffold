// A custom theme for this app

import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export default themes;
