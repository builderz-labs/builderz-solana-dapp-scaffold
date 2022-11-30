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
import { ToastContainer } from 'react-toastify';
import themes from "../components/themes";


const drawerWidth = 240;


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}



function MyApp({ Component, pageProps }: AppProps) {
  // Get OS-level preference for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // state: boolean ; true == use dark mode
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const themeString = (b: boolean) => (b ? "dark" : "light");


  
  const theme = React.useMemo(
    () => createTheme(themeString(darkMode) === "dark" ? themes.dark : themes.light),
    [darkMode]
  );

  const toggleDarkMode = (useDark?: boolean) => {
    if (useDark === null) {setDarkMode(prefersDarkMode);
    
    }
    else setDarkMode(useDark!);
  };
  return (
    <ThemeProvider theme={theme} >
      <ContextProvider>
        <CssBaseline enableColorScheme />
        <WalletModalProvider>
          <AppBar />
          <ThemeSwitcherComponent useOs={true} themeChanger={toggleDarkMode} />
          <Component {...pageProps} />
        </WalletModalProvider>
      </ContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  );
}

export default MyApp;
