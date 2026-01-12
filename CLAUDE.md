# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install      # Install dependencies
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm format       # Check formatting with Prettier
pnpm format:fix   # Fix formatting issues
```

## Environment Setup

Copy `.env.example` to `.env` and set `NEXT_PUBLIC_HELIUS_URL` to your Solana RPC endpoint (e.g., from Helius).

## Architecture

This is a Next.js 15 App Router scaffold for Solana dApps using Tailwind CSS v4 and shadcn/ui.

### Provider Hierarchy

```
app/layout.tsx
└── Providers (app/providers.tsx)
    └── ThemeProvider (next-themes) - System/dark/light mode
        └── WalletContextProvider (contexts/ContextProvider.tsx) - Solana wallet
```

- **ThemeProvider**: Uses `next-themes` with `attribute="class"` and `defaultTheme="system"`. Access via `useTheme()` hook.
- **WalletContextProvider**: Wraps the app with Solana wallet adapter providers. RPC endpoint from `NEXT_PUBLIC_HELIUS_URL`.

### Styling

- **Tailwind CSS v4**: CSS-first configuration in `styles/globals.css` using `@theme { }` directive
- **shadcn/ui**: Component library using Radix primitives. Components in `components/ui/`
- **CSS Variables**: shadcn color system with `--background`, `--foreground`, `--primary`, etc.

Custom brand colors: `builderz-green` (#14f195), `builderz-blue` (#00ffd5)

### Key Directories

```
components/
├── ui/          # shadcn/ui components (button, sheet, etc.)
├── layout/      # Header, footer, theme-toggle, mobile-nav
├── wallet/      # Wallet button wrapper
└── logo.tsx     # Theme-aware logo
lib/
└── utils.ts     # cn() utility for class merging
```

### Adding shadcn Components

```bash
pnpm dlx shadcn@latest add [component-name]
```

### Path Aliases

Use `@/` prefix for imports (configured in `tsconfig.json`):

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```
