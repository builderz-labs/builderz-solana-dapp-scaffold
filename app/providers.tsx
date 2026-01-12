"use client";

import { ThemeProvider } from "next-themes";
import WalletContextProvider from "@/contexts/ContextProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WalletContextProvider>{children}</WalletContextProvider>
    </ThemeProvider>
  );
}
