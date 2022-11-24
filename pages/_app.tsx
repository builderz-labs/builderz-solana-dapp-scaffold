import { useState } from "react";
import type { AppProps } from "next/app";
import AppBar from "../components/AppBar";
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useMediaQuery } from "@mui/material";

import ContextProvider from "../contexts/ContextProvider";

require("@solana/wallet-adapter-react-ui/styles.css");

const drawerWidth = 240;

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <CssBaseline />
        <WalletModalProvider>
          <AppBar />
          <Component {...pageProps} />
        </WalletModalProvider>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
