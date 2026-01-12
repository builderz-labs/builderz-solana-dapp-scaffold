"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Github, Twitter, Globe } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet/wallet-button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9 rounded-xl hover:bg-accent/80 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] bg-background/95 backdrop-blur-xl border-r border-border/50"
      >
        <SheetHeader className="pb-6 border-b border-border/50">
          <SheetTitle className="text-lg font-semibold gradient-text">
            Navigation
          </SheetTitle>
        </SheetHeader>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2 py-6">
          <NavItem
            href="/"
            icon={<Home className="h-4 w-4" />}
            onClick={() => setOpen(false)}
          >
            Home
          </NavItem>
        </nav>

        {/* Wallet button for mobile */}
        <div className="py-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3">Connect Wallet</p>
          <WalletButton />
        </div>

        {/* Social links */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs text-muted-foreground mb-3">Follow us</p>
          <div className="flex gap-2">
            <SocialButton
              href="https://builderz.dev"
              icon={<Globe className="h-4 w-4" />}
              label="Website"
            />
            <SocialButton
              href="https://github.com/builderz-labs"
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
            />
            <SocialButton
              href="https://x.com/builaboratory"
              icon={<Twitter className="h-4 w-4" />}
              label="Twitter"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavItem({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground hover:bg-accent/80 hover:text-builderz-green transition-all duration-200 group"
    >
      <span className="text-muted-foreground group-hover:text-builderz-green transition-colors">
        {icon}
      </span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-accent/30 hover:bg-accent hover:border-builderz-green/30 hover:text-builderz-green transition-all duration-200 text-sm text-muted-foreground"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
