import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import AppBar from "../components/AppBar";
import "../styles/globals.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
const network: Network = "mainnet-beta";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>

    <ThirdwebProvider network={network}>
      <CssBaseline />
      <WalletModalProvider>
        <AppBar />
        <Component {...pageProps} />
      </WalletModalProvider>
    </ThirdwebProvider>
    </ThemeProvider>
  );
}

export default MyApp;
