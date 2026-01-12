# Builderz Solana dApp Scaffold

A modern, minimal [Solana](https://solana.com) dApp scaffold built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Features a polished design system with 2026 aesthetics including glassmorphism, micro-animations, and a unified component library.

Built for the community by [Builderz](https://builderz.dev).

## Features

- **Modern Design System** - Glassmorphism, soft UI, and micro-delight animations
- **System Theme Detection** - Automatic dark/light mode based on OS preference
- **Unified Button Styles** - Consistent button variants (glow, soft, glass, outline)
- **Polished Wallet Integration** - Styled wallet modal and dropdown
- **Responsive Layout** - Mobile-first design with smooth transitions
- **Developer Ready** - Clean architecture, TypeScript, and ESLint configured
- **AI-Assisted Development** - Includes [Solana development rules](https://github.com/builderz-labs/solana-claude-md) for Claude Code

## Stack

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - Latest React with concurrent features
- **Tailwind CSS v4** - CSS-first configuration
- **shadcn/ui** - Accessible component primitives
- **next-themes** - Dark/light/system theme support
- **Solana Wallet Adapter** - Multi-wallet support
- **Lucide Icons** - Beautiful, consistent icons

## Getting Started

### Prerequisites

- Node.js 24+ (Next.js 16 requires Node.js 20.9.0 minimum)
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/builderz-labs/builderz-solana-dapp-scaffold.git
cd builderz-solana-dapp-scaffold

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env and add your RPC endpoint (e.g., from Helius)

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Check formatting
pnpm format:fix   # Fix formatting
pnpm solana-rules # Generate/update Solana AI rules
```

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout with providers
│   ├── providers.tsx     # Theme + Wallet providers
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components (button, sheet)
│   ├── layout/           # Header, footer, theme toggle, mobile nav
│   └── wallet/           # Wallet button wrapper
├── contexts/
│   └── ContextProvider.tsx  # Solana wallet context
├── lib/
│   └── utils.ts          # Utility functions (cn)
└── styles/
    └── globals.css       # Design system & Tailwind v4 config
```

## Design System

### CSS Utilities

The scaffold includes a comprehensive set of CSS utilities in `globals.css`:

```css
/* Backgrounds */
.bg-mesh              /* Auto-detecting mesh gradient */

/* Glassmorphism */
.glass                /* Frosted glass effect */
.glass-strong         /* Stronger blur */

/* Glow Effects */
.glow-green           /* Brand green glow */
.glow-blue            /* Brand blue glow */
.text-glow-green      /* Text shadow glow */

/* Animations */
.animate-fade-in      /* Fade in */
.animate-fade-in-up   /* Fade in from below */
.animate-float        /* Floating animation */
.animate-glow-pulse   /* Pulsing glow */

/* 2026 Trends */
.soft-ui              /* Neumorphic card */
.soft-ui-button       /* Neumorphic button */
.micro-bounce         /* Tactile button feedback */
.card-lift            /* Hover lift effect */
.border-glow          /* Interactive border */
```

### Button Variants

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Primary</Button>
<Button variant="glow">Glowing</Button>
<Button variant="soft">Soft UI</Button>
<Button variant="glass">Glass</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
```

### Theme Toggle

The theme cycles through: **System** → **Light** → **Dark**

System preference is respected by default, with CSS media queries ensuring correct theme on initial load.

## Adding Components

Use the shadcn CLI to add new components:

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add input
```

## Environment Variables

| Variable                 | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `NEXT_PUBLIC_HELIUS_URL` | Solana RPC endpoint (defaults to mainnet-beta) |

## Customization

### Brand Colors

Edit the theme variables in `styles/globals.css`:

```css
@theme {
  --color-builderz-green: #14f195;
  --color-builderz-blue: #00ffd5;
}
```

### Mesh Gradient

The `.bg-mesh` class automatically switches between light and dark variants based on the theme.

## AI-Assisted Development

This scaffold includes comprehensive Solana development rules for AI coding assistants like Claude Code, powered by [solana-claude-md](https://github.com/builderz-labs/solana-claude-md).

### Setup

Run the interactive setup to generate AI configuration files:

```bash
pnpm solana-rules
# Or directly: npx solana-claude-md
```

Choose from the available options:
1. **CLAUDE.md** - General Solana development rules
2. **SOLANA_EXPERT_AGENT.md** - Backend/program development expert
3. **SOLANA_FRONTEND_AGENT.md** - Frontend/dApp development expert
4. **All files** - Install all configuration files (recommended)

### Generated Files

| File | Purpose |
| ---- | ------- |
| `CLAUDE.md` | Core Solana development rules and best practices |
| `SOLANA_EXPERT_AGENT.md` | Backend expert: Anchor, native programs, security |
| `SOLANA_FRONTEND_AGENT.md` | Frontend expert: wallet adapter, transactions, UI |

### Coverage

The rules cover:

- **Modern Tooling** - Pinocchio, Anchor 0.32+, Steel, @solana/kit
- **Security Best Practices** - Account validation, CPI security, attack vectors
- **Testing Frameworks** - Mollusk, LiteSVM, Trident fuzzing
- **Transaction Optimization** - Compute units, priority fees, landing strategies
- **Frontend Patterns** - Wallet adapter, transaction handling, error states
- **Common Pitfalls** - Avoiding deprecated crates and unsafe patterns

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Documentation](https://docs.solana.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a PR.

## Links

- [Website](https://builderz.dev)
- [GitHub](https://github.com/builderz-labs)
- [Twitter](https://x.com/builaboratory)

## License

MIT
