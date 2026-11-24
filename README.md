# Builderz Solana dApp Scaffold

A Next.js App Router starter for connecting a Solana wallet. Tailwind CSS v4 and shadcn/ui power the interface. It includes a responsive home page, a mobile navigation drawer and a system, light and dark theme. Solana Kit provides the RPC client, Wallet Standard discovers compatible wallets, and the React provider shares the selected account across the app.

## Run locally

Use Node.js 26 LTS and pnpm 12.23.0. If pnpm is missing, install it with `npm install --global pnpm@12.23.0`. The package manifest pins pnpm, Next.js, React and the Solana client packages. The default RPC endpoint is Solana devnet. You can start the app without credentials or funds.

```sh
git clone https://github.com/builderz-labs/builderz-solana-dapp-scaffold.git
cd builderz-solana-dapp-scaffold
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost on port 3000](http://localhost:3000). Select **Connect wallet** and choose an installed Wallet Standard wallet. Approving a connection shares the selected account with the page. The starter does not request a transaction.

## Configure an RPC endpoint

Copy `.env.example` to `.env.local`. Select `devnet` or `mainnet` with `NEXT_PUBLIC_SOLANA_CLUSTER`. To supply your own endpoint, set `NEXT_PUBLIC_SOLANA_RPC_URL` to a browser-safe HTTP(S) RPC endpoint. Restart the development server after changing it. Existing forks can also use `NEXT_PUBLIC_HELIUS_URL`. The new RPC variable takes priority. For existing Helius configurations with no explicit cluster, the legacy setting retains the mainnet default. Next.js embeds public variables at build time. Keep secret provider credentials on a server you control.

## Check a change

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

The browser tests use a simulated wallet. To check a real integration, open the app in a wallet-enabled browser, cancel a connection once, connect on the next attempt and disconnect from the menu. No SOL is needed. Run `pnpm start` to serve the production build.

## Where to make changes

| Path                                  | Responsibility                                       |
| ------------------------------------- | ---------------------------------------------------- |
| `app/page.tsx`                        | Home screen and main wallet entry point              |
| `app/providers.tsx`                   | Theme and wallet provider composition                |
| `lib/solana-client.ts`                | Solana Kit client, RPC endpoint and wallet discovery |
| `contexts/ContextProvider.tsx`        | React client provider                                |
| `components/wallet/wallet-button.tsx` | Wallet selection and connected-account controls      |
| `components/layout/`                  | Header, footer, theme switch and mobile navigation   |
| `styles/globals.css`                  | Tailwind CSS v4 theme and component styles           |

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

The mobile menu uses the local shadcn Sheet and Button. Tailwind v4 reads the shadcn color tokens from `@theme inline` in `styles/globals.css`. Add a component with the shadcn CLI:

```bash
pnpm exec shadcn add dialog
pnpm exec shadcn add dropdown-menu
pnpm exec shadcn add input
```

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

| File                       | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `CLAUDE.md`                | Core Solana development rules and best practices               |
| `SOLANA_EXPERT_AGENT.md`   | Backend expert: Anchor, native programs, security              |
| `SOLANA_FRONTEND_AGENT.md` | Frontend examples for wallet integration, transactions, and UI |

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
- [Solana Documentation](https://solana.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Solana Kit and React](https://solana.com/docs/frontend)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a PR.

## Links

- [Website](https://builderz.dev)
- [GitHub](https://github.com/builderz-labs)
- [Twitter](https://x.com/builderzdotdev)
- [Maintainer](https://nyk.dev) · [Sponsor ongoing OSS maintenance](https://github.com/sponsors/0xNyk) · [@nykdotdev](https://x.com/nykdotdev)

## License

[Apache License 2.0](LICENSE.md)
