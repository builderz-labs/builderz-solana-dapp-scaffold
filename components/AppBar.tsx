import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "./Drawer";
import { Logo } from "./Logo";
import React from "react";
import ThemeSwitcherComponent from "./ThemeSwitcher";
import Toolbar from "@mui/material/Toolbar";
import MyMultiButton from './MyMultiButton';
import Link from 'next/link';

export default function PrimarySearchAppBar({ setTheme, setIsDark, isDark }: any) {
  return (
    <Box sx={{ flexGrow: 1 }} className="w-full">
      <AppBar
        position="static" className="w-ful justify-between bg-white dark:bg-black" elevation={0}
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
            <div>
              <Link href="/" className="text-[#000000] text-[18px] font-bold">Home</Link>
            </div>
          </Box>
          <Box
            sx={{
              display: { md: "flex" },
              flexDirection: "row",
            }}
          >
            <div className="flex ml-4 items-center gap-2">
              <ThemeSwitcherComponent isDark={isDark} setIsDark={setIsDark} />
              <MyMultiButton />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
