"use client";

import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

export function WalletButton() {
  return (
    <div className="relative z-50">
      <WalletMultiButtonDynamic />
    </div>
  );
}
