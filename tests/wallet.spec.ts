import { test, expect, type Page } from "@playwright/test";

const TEST_ADDRESS = "11111111111111111111111111111111";
const TEST_PUBLIC_KEY = Array<number>(32).fill(0);

/** Register a deterministic Wallet Standard wallet before the app boots. */
async function registerTestWallet(page: Page) {
  await page.addInitScript(
    ({ address, publicKey }) => {
      const account = {
        address,
        publicKey: new Uint8Array(publicKey),
        chains: ["solana:devnet"],
        features: ["solana:signTransaction"],
        label: "Builderz QA Wallet",
      };
      type TestAccount = typeof account;
      type TestWallet = {
        version: "1.0.0";
        name: string;
        icon: string;
        chains: string[];
        accounts: TestAccount[];
        features: Record<string, unknown>;
      };
      type ChangeListener = (change: { accounts: TestAccount[] }) => void;
      const listeners = new Set<ChangeListener>();
      const emitAccounts = (accounts: TestAccount[]) => {
        wallet.accounts = accounts;
        listeners.forEach((listener) => listener({ accounts }));
      };
      const wallet: TestWallet = {
        version: "1.0.0",
        name: "Builderz QA Wallet",
        icon: "data:image/svg+xml;base64,PHN2Zy8+",
        chains: ["solana:devnet"],
        accounts: [],
        features: {
          "standard:connect": {
            version: "1.0.0",
            connect: async () => {
              emitAccounts([account]);
              return { accounts: [account] };
            },
          },
          "standard:disconnect": {
            version: "1.0.0",
            disconnect: async () => {
              emitAccounts([]);
            },
          },
          "solana:signTransaction": {
            version: "1.0.0",
            supportedTransactionVersions: ["legacy", 0],
            signTransaction: () => {
              throw new Error("Unexpected signature request");
            },
          },
          "standard:events": {
            version: "1.0.0",
            on: (_event: "change", listener: ChangeListener) => {
              listeners.add(listener);
              return () => listeners.delete(listener);
            },
          },
        },
      };

      window.addEventListener("wallet-standard:app-ready", (event) => {
        (
          event as CustomEvent<{ register: (wallet: TestWallet) => void }>
        ).detail.register(wallet);
      });
      window.dispatchEvent(
        new CustomEvent("wallet-standard:register-wallet", {
          detail: (api: { register: (wallet: TestWallet) => void }) =>
            api.register(wallet),
        }),
      );
    },
    { address: TEST_ADDRESS, publicKey: TEST_PUBLIC_KEY },
  );
}

test("shows the empty-wallet guidance after hydration", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const chooser = page.getByRole("main").locator("details");
  await chooser.locator("summary").click();
  await expect(
    chooser.getByText(/open a wallet standard-compatible/i),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("connects and disconnects the same account across controls", async ({
  page,
}) => {
  await registerTestWallet(page);
  await page.goto("/");
  const chooser = page.getByRole("main").locator("details");
  await chooser.locator("summary").click();
  await chooser.getByRole("button", { name: "Builderz QA Wallet" }).click();
  const connected = chooser.locator("summary");
  await expect(connected).toHaveAttribute("aria-label", /wallet connected/i);
  await expect(connected).toContainText("1111");
  // Changing from the chooser to the account menu can retain the open state.
  if (
    !(await chooser
      .getByRole("button", { name: "Disconnect wallet", exact: true })
      .isVisible())
  ) {
    await connected.click();
  }
  await chooser
    .getByRole("button", { name: "Disconnect wallet", exact: true })
    .click();
  await expect(chooser.locator("summary")).toHaveText(/connect wallet/i);
  await expect(page.getByLabel(/wallet connected/i)).toHaveCount(0);
});

test("opens the wallet chooser from site navigation", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile)
    await page.getByRole("button", { name: /toggle menu/i }).click();
  const navigation = isMobile
    ? page.getByRole("dialog")
    : page.getByRole("banner");
  const chooser = navigation.locator("details");
  await chooser.locator("summary").click();
  await expect(
    chooser.getByText(/open a wallet standard-compatible/i),
  ).toBeVisible();
});
