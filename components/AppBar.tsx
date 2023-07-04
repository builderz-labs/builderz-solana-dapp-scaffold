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
    <Box sx={{ flexGrow: 1 }} className="w-full max-w-7xl mx-auto">
      <div className="w-full p-2">

        <Toolbar>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            <Drawer />
            <Logo isDark={isDark} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <div className='hidden lg:flex items-center justify-end px-10 '>
              <Link href="/" className="text-[#000000] dark:text-white text-[18px] font-bold">Home</Link>
            </div>
          </Box>
          <Box
            sx={{
              display: { md: "flex" },
              flexDirection: "row",
            }}
          >
            <div className="flex items-center gap-2">
              <ThemeSwitcherComponent isDark={isDark} setIsDark={setIsDark} />
              <MyMultiButton />
            </div>
          </Box>
        </Toolbar>
      </div>
    </Box>
  );
}
