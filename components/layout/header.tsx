"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { WalletButton } from "@/components/wallet/wallet-button";

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl opacity-0 animate-fade-in-down">
      <nav className="flex items-center justify-between px-4 py-2.5 glass-strong rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20">
        {/* Left section: Mobile nav + Logo */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Logo />
        </div>

        {/* Center section: Navigation links (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink href="/" active>
            Home
          </NavLink>
        </div>

        {/* Right section: Theme toggle + Wallet */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <WalletButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${
          active
            ? "text-builderz-green"
            : "text-muted-foreground hover:text-foreground"
        }
        hover:bg-accent/50
        group
      `}
    >
      {children}
      {/* Active indicator */}
      {active && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-builderz-green" />
      )}
      {/* Hover underline */}
      {!active && (
        <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-builderz-green to-builderz-blue rounded-full transition-all duration-300 group-hover:w-4 group-hover:-translate-x-1/2" />
      )}
    </Link>
  );
}
