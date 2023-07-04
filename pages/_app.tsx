import "../styles/globals.css";

import 'react-toastify/dist/ReactToastify.css'

import AppBar from "../components/AppBar";
import type { AppProps } from "next/app";
import ContextProvider from "../contexts/ContextProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from 'react-toastify';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useState } from 'react';

require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }: AppProps) {
  // Get OS-level preference for dark mode
  const [isDark, setIsDark] = useState(false);

  return (
    <ContextProvider>
      <CssBaseline enableColorScheme />
      <WalletModalProvider>
        <AppBar isDark={isDark} setIsDark={setIsDark} />
        <Component {...pageProps} />
        {/* Change Notification settings here */}
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
      </WalletModalProvider>
    </ContextProvider>

  );
}

export default MyApp;
