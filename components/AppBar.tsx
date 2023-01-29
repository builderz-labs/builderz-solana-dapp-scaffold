import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "./Drawer";
import { Logo } from "./Logo";
import React from "react";
import ThemeSwitcherComponent from "./ThemeSwitcher";
import Toolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function PrimarySearchAppBar({ setTheme, setIsDark, isDark }: any) {
  return (
    <Box sx={{ flexGrow: 1 }} className="w-full">
      <AppBar
        position="static" color="transparent" className="w-ful justify-between" elevation={0}
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <Toolbar>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Drawer />
            <Logo isDark={isDark} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <div></div>
          </Box>
          <Box
            sx={{
              display: { md: "flex" },
              flexDirection: "row",
            }}
          >
            <div className="flex ml-4 items-center gap-2">
              <ThemeSwitcherComponent isDark={isDark} setIsDark={setIsDark} />
              <WalletMultiButtonDynamic className="btn btn-outline glow my-4" />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
