import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

import Brand from "../../public/images/builderz-logo2.png";
import BrandW from "../../public/images/builderz-logo2W.png";

export const Logo = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Link href="/" passHref>
      <Image
        src={currentTheme === "dark" ? Brand : BrandW}
        alt=""
        className="w-auto min-w-[250px] cursor-pointer"
      />
    </Link>
  );
};
