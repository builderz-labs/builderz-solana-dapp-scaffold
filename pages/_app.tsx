import { useState } from "react";
import type { AppProps } from "next/app";
import AppBar from "../components/AppBar";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useMediaQuery } from "@mui/material";

import ContextProvider from "../contexts/ContextProvider";

require("@solana/wallet-adapter-react-ui/styles.css");
import { createTheme } from "@mui/material";
import ThemeSwitcherComponent from "../components/ThemeSwitcher";

const drawerWidth = 240;

function MyApp({ Component, pageProps }: AppProps) {
  // Get OS-level preference for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // state: boolean ; true == use dark mode
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const themeString = (b: boolean) => (b ? "dark" : "light");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeString(darkMode),
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = (checked: boolean) => {
    if (checked === null) setDarkMode(prefersDarkMode);
    else setDarkMode(checked);
  };
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <CssBaseline />
        <WalletModalProvider>
          <AppBar />
          <ThemeSwitcherComponent useOs={true} themeChanger={toggleDarkMode} />

          <Component {...pageProps} />
        </WalletModalProvider>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
