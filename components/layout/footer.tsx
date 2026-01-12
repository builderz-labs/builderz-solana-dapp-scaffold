"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Twitter, Globe } from "lucide-react";

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "light"
      ? "/images/Main-Logo-Steel-Black.png"
      : "/images/Main-Logo-White.png";

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Social links */}
          <div className="flex items-center gap-1">
            <FooterLink
              href="https://builderz.dev"
              icon={<Globe className="h-4 w-4" />}
            />
            <FooterLink
              href="https://github.com/builderz-labs"
              icon={<Github className="h-4 w-4" />}
            />
            <FooterLink
              href="https://x.com/builaboratory"
              icon={<Twitter className="h-4 w-4" />}
            />
          </div>

          {/* Center: Powered by */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="hidden sm:inline">Scaffold by</span>
            <Link
              href="https://builderz.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src={logoSrc}
                alt="Builderz"
                width={70}
                height={18}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>

          {/* Right: Version badge */}
          <div className="hidden sm:flex items-center">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-builderz-green/10 text-builderz-green border border-builderz-green/20">
              v2.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg text-muted-foreground/70 hover:text-builderz-green hover:bg-accent/50 transition-all duration-200"
    >
      {icon}
    </Link>
  );
}
