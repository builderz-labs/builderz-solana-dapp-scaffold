"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();

  // Default to white logo during SSR and before mount (dark mode default)
  const logoSrc =
    mounted && resolvedTheme === "light"
      ? "/images/Main-Logo-Steel-Black.png"
      : "/images/Main-Logo-White.png";

  return (
    <Link href="/" className={className}>
      <Image
        src={logoSrc}
        alt="Builderz"
        width={140}
        height={40}
        className="w-24 md:w-32 lg:w-36"
        priority
      />
    </Link>
  );
}
