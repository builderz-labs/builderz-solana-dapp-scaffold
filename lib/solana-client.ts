import { createClient } from "@solana/kit";
import { solanaRpc } from "@solana/kit-plugin-rpc";
import { walletSigner } from "@solana/kit-plugin-wallet";

const DEVNET_RPC_URL = "https://api.devnet.solana.com";
const MAINNET_RPC_URL = "https://api.mainnet-beta.solana.com";

const configuredRpcUrl =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim() || undefined;
const legacyHeliusRpcUrl =
  process.env.NEXT_PUBLIC_HELIUS_URL?.trim() || undefined;
const configuredCluster =
  process.env.NEXT_PUBLIC_SOLANA_CLUSTER?.trim() || undefined;

// Existing scaffold projects used Helius against mainnet, while new projects
// start safely on devnet. Set NEXT_PUBLIC_SOLANA_CLUSTER when overriding RPC.
export const solanaCluster =
  configuredCluster === "mainnet" ||
  (!configuredCluster && !configuredRpcUrl && legacyHeliusRpcUrl)
    ? "mainnet"
    : "devnet";

const rpcUrl =
  configuredRpcUrl ??
  legacyHeliusRpcUrl ??
  (solanaCluster === "mainnet" ? MAINNET_RPC_URL : DEVNET_RPC_URL);

export const solanaClient = createClient()
  .use(walletSigner({ chain: `solana:${solanaCluster}` }))
  .use(solanaRpc({ rpcUrl }));

export type AppSolanaClient = Awaited<typeof solanaClient>;
