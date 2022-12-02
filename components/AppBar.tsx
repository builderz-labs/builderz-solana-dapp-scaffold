import React from "react";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";
import Drawer from "./Drawer";
import ThemeSwitcherComponent from "./ThemeSwitcher";
import { Logo } from "./Logo";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function PrimarySearchAppBar({ setTheme }: any) {
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
            <Logo />
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
              <ThemeSwitcherComponent themeChanger={setTheme} />
              <WalletMultiButtonDynamic className="btn btn-outline glow my-4" />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
