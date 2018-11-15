import * as Puppeteer from "puppeteer";
import { join } from "path";
import { LaunchOptions } from "puppeteer";
import { PuppeteerMetamask } from "./PuppeteerMetamask";

export function launchPuppeteerWithMetamask(
  puppeteer: typeof Puppeteer,
  extraArgs: LaunchOptions = {},
  metamaskPath: string = getBundledMetamaskInfo().absPath,
): Promise<Puppeteer.Browser> {
  const finalArgs = {
    args: [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      ...(extraArgs.args || []),
    ],
    ...extraArgs,
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
  // personally I just right click metamask icon on loaded instance and read ID from the URL
  extensionId: string;

  walletSeed: string;
  walletPass: string;
}

export function getBundledMetamaskInfo(): MetamaskBundleInfo {
  return {
    absPath: join(__dirname, "../metamask-bundle"),
    extensionId: "ffpmbihhbnmhllhbimmbknifbbbcmgni",
    walletSeed: "jungle elevator february polar wash tower sword come mosquito goose awesome length",
    walletPass: "test1234",
  };
}
