import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import Head from "next/head";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

import "react-toastify/dist/ReactToastify.css";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const notify = () =>
    toast("🦄 Wow so easy!");

  return (
    <>
      <Head>
        <title>Builderz Solana dApp Scaffold</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className="mockup-window border bg-inherit p-[1.25rem]">
          <div className="flex flex-col justify-center p-4 bg-inherit gap-4">
            <div className={styles.iconContainer}>
              <a
                href="https://builderz.build"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Image
                  src="/images/builderz-logo-b.png"
                  height={60}
                  width={50}
                  style={{
                    objectFit: "contain",
                  }}
                  alt="builderz"
                />
              </a>
              <Image
                width={75}
                height={75}
                src="/sol.png"
                className={styles.icon}
                alt="sol"
              />
            </div>
            <h1 className={styles.h1}>Hello Solana, meet Builderz 👋</h1>
            <p className={styles.explain}>
              Explore what you can do with Builderz&rsquo; brand new{" "}
              <b>Builderz Solana dApp Scaffold</b>
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-around  items-center py-8">
              <button onClick={notify} className="btn glow-on-hover">
                Notify!
              </button>
              <Modal />
              <WalletMultiButtonDynamic className="btn glow" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
