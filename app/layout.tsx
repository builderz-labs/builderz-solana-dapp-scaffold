import { Toaster } from "sonner";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Builderz Solana dApp Scaffold",
  description: "A modern Solana dApp scaffold with Next.js 15 and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          <main className="min-h-screen pt-20 pb-16">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
