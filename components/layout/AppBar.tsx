'use client'

import Box from "@mui/material/Box";
import Drawer from "../Drawer";
import { Logo } from "../Logo";
import React, { useContext, useState } from "react";
import ThemeSwitcherComponent from "./ThemeSwitcher";
import Toolbar from "@mui/material/Toolbar";
import MyMultiButton from './MyMultiButton';
import Link from 'next/link';
import { ThemeContext } from '../../contexts/ThemeProvider';

export default function PrimarySearchAppBar() {

  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <Box sx={{ flexGrow: 1 }} className="w-full max-w-7xl mx-auto fixed top-4 left-1/2 -translate-x-1/2 bg-transparent dark:bg-gray-900 rounded-lg shadow-lg border border-0.5 border-gray-100 dark:border-gray-800">
      <div className="w-full ">
        <Toolbar>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            <Drawer />
            <Logo isDark={isDark} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <div className='hidden lg:flex items-center justify-end px-10 gap-6 '>
              <Link href="/" className="text-[#000000] dark:text-white text-[18px] font-bold navLink">Home</Link>
              <Link href="/basic" className="text-[#000000] dark:text-white text-[18px] font-bold navLink">Basic</Link>
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
