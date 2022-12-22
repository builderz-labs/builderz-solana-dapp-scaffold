import Brand from "../public/images/builderz-logo2-b.png";
import BrandW from "../public/images/builderz-logo2.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = ({ isDark }) => {


  return (
    <Link href="/" passHref>
      <Image
        src={!isDark === true ? Brand : BrandW}
        alt=""
        className="w-auto min-w-[30px] w-12 md:w-32 lg:w-64 max-w-[200px] cursor-pointer"
      />
    </Link>
  );
};
