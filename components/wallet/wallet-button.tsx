"use client";

import {
  useConnect,
  useConnectedWallet,
  useDisconnect,
  useIsWalletReady,
  useWallets,
} from "@solana/kit-plugin-wallet/react";
import { useClient } from "@solana/react";
import Image from "next/image";
import type { AppSolanaClient } from "@/lib/solana-client";
import { useMounted } from "@/lib/use-mounted";

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function WalletButton() {
  const client = useClient<AppSolanaClient>();
  const isMounted = useMounted();
  const wallets = useWallets(client);
  const connectedWallet = useConnectedWallet(client);
  const isWalletReady = useIsWalletReady(client);
  const connect = useConnect(client);
  const disconnect = useDisconnect(client);

  if (!isMounted) {
    return (
      <button
        type="button"
        disabled
        className="min-h-11 rounded-full bg-builderz-green px-5 text-sm font-semibold text-black opacity-60"
      >
        Checking wallets…
      </button>
    );
  }

  if (connectedWallet) {
    return (
      <details className="group relative z-50">
        <summary
          aria-label="Wallet connected. Open disconnect menu"
          className="flex min-h-11 cursor-pointer list-none items-center justify-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-builderz-green [&::-webkit-details-marker]:hidden"
        >
          {shortenAddress(connectedWallet.account.address)}
        </summary>
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-xl">
          <button
            type="button"
            onClick={() => disconnect.dispatch()}
            disabled={disconnect.isRunning}
            className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-medium text-destructive transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-builderz-green disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disconnect.isRunning ? "Disconnecting…" : "Disconnect wallet"}
          </button>
        </div>
      </details>
    );
  }

  return (
    <details className="group relative z-50">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center rounded-full bg-builderz-green px-5 text-sm font-semibold text-black shadow-[0_4px_14px_rgba(20,241,149,0.25)] transition hover:bg-builderz-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-builderz-green group-open:bg-builderz-blue [&::-webkit-details-marker]:hidden">
        {isWalletReady ? "Connect wallet" : "Checking wallets…"}
      </summary>
      <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-card p-2 shadow-xl">
        {wallets.length > 0 ? (
          <div className="grid gap-1" aria-label="Available wallets">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                type="button"
                onClick={() => connect.dispatch(wallet)}
                disabled={!isWalletReady || connect.isRunning}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-builderz-green disabled:cursor-not-allowed disabled:opacity-60"
              >
                {wallet.icon ? (
                  <Image
                    src={wallet.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 rounded-md"
                    unoptimized
                  />
                ) : null}
                {connect.isRunning ? "Connecting…" : wallet.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="px-3 py-2 text-sm leading-6 text-muted-foreground">
            Open a Wallet Standard-compatible Solana wallet to connect.
          </p>
        )}
        {connect.error ? (
          <p role="alert" className="px-3 py-2 text-sm text-destructive">
            Wallet connection was cancelled or unavailable. Try again.
          </p>
        ) : null}
      </div>
    </details>
  );
}
