import * as Puppeteer from "puppeteer";
import { join } from "path";
import { LaunchOptions } from "puppeteer";
import { PuppeteerMetamask } from "./PuppeteerMetamask";

export { PuppeteerMetamask, MetamaskNetwork } from "./PuppeteerMetamask";

export function launchPuppeteerWithMetamask(
  puppeteer: typeof Puppeteer,
  extraArgs: LaunchOptions = {},
  metamaskPath: string = getBundledMetamaskInfo().absPath,
): Promise<Puppeteer.Browser> {
  const finalArgs = {
    ...extraArgs,
    args: [...getChromeCliArgs(metamaskPath), ...(extraArgs.args || [])],
  };

  return puppeteer.launch(finalArgs);
}

export async function setupMetamask(
  browser: Puppeteer.Browser,
  metamaskBundleInfo = getBundledMetamaskInfo(),
): Promise<PuppeteerMetamask> {
  const puppeteerMetamask = new PuppeteerMetamask(browser, metamaskBundleInfo);

  await puppeteerMetamask.init();

  return puppeteerMetamask;
}

export interface MetamaskBundleInfo {
  absPath: string;
  // how to find it: https://stackoverflow.com/questions/8946325/chrome-extension-id-how-to-find-it
  extensionId: string;

  walletSeed: string;
  walletPass: string;
}

export function getChromeCliArgs(metamaskPath: string = getBundledMetamaskInfo().absPath): string[] {
  return [`--disable-extensions-except=${metamaskPath}`, `--load-extension=${metamaskPath}`];
}

export function getBundledMetamaskInfo(): MetamaskBundleInfo {
  return {
    absPath: join(__dirname, "../metamask-bundle"),
    extensionId: "aomjjhallfgjeglblehebfpbcfeobpgk",
    walletSeed: "jungle elevator february polar wash tower sword come mosquito goose awesome length",
    walletPass: "test1234",
  };
}
