"use client";

import { WalletButton } from "@/components/wallet/wallet-button";
import { ArrowRight, Github, Globe, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[86vh] flex flex-col items-center justify-center p-4 bg-mesh">
      {/* Main content container */}
      <div className="max-w-2xl w-full space-y-10 text-center relative">
        {/* Floating logo with glow effect */}
        <div
          className="flex justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: "0ms" }}
        >
          <div className="relative animate-float">
            <div className="animate-glow-pulse">
              <Image
                src="/images/favi.png"
                alt="Builderz"
                width={120}
                height={120}
                priority
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Title with animated gradient */}
        <div
          className="space-y-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="gradient-text-animated">Solana dApp</span>
            <br />
            <span className="text-foreground">Scaffold</span>
          </h1>
        </div>

        {/* Description */}
        <p
          className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          A modern, minimal scaffold for building Solana dApps with{" "}
          <span className="text-foreground font-medium">Next.js 16</span>,{" "}
          <span className="text-foreground font-medium">Tailwind CSS v4</span>,
          and <span className="text-foreground font-medium">shadcn/ui</span>.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "450ms" }}
        >
          <WalletButton />
          <Link
            href="https://github.com/builderz-labs/builderz-solana-dapp-scaffold"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-background/50 hover:bg-accent hover:border-builderz-green/30 transition-all duration-300"
          >
            <Github className="h-4 w-4" />
            <span className="font-medium">View Source</span>
            <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </Link>
        </div>

        {/* Social Links */}
        <div
          className="flex items-center justify-center gap-6 pt-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <SocialLink
            href="https://builderz.dev"
            icon={<Globe className="h-5 w-5" />}
            label="Website"
          />
          <SocialLink
            href="https://github.com/builderz-labs"
            icon={<Github className="h-5 w-5" />}
            label="GitHub"
          />
          <SocialLink
            href="https://x.com/builaboratory"
            icon={<X className="h-5 w-5" />}
            label="Twitter"
          />
        </div>

        {/* Built by badge */}
        <div
          className="pt-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "750ms" }}
        >
          <span className="text-xs text-muted-foreground/70">
            Built for the community by{" "}
            <Link
              href="https://builderz.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-builderz-green hover:text-builderz-blue transition-colors"
            >
              Builderz
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-3 rounded-full border border-transparent hover:border-border hover:bg-accent/50 transition-all duration-300"
    >
      <span className="text-muted-foreground group-hover:text-builderz-green transition-colors duration-300">
        {icon}
      </span>
      <span className="sr-only">{label}</span>
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-card border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </Link>
  );
}
