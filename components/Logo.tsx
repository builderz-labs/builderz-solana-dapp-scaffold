import Image from "next/image";
import Link from "next/link";
import React from "react";
import BrandW from "../public/images/builderz-logo2.png";
import Brand from "../public/images/builderz-logo2-b.png";

export const Logo = ({ darkMode }: any) => {

  return (
    <Link href="/" passHref>
      <Image
        src={darkMode === true ? Brand : BrandW}
        alt=""
        className="w-auto min-w-[100px] max-w-[200px] cursor-pointer"
      />
    </Link>
  );
};
