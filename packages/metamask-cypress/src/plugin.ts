import { getBundledMetamaskInfo } from "metamask-puppeteer";
import * as Puppeteer from "puppeteer";
import { PuppeteerMetamask, MetamaskNetwork } from "metamask-puppeteer";
import { MetamaskCypressTasksHandler } from ".";
const fetch = require("node-fetch");

// cypress provides very low quality types for this case
export function metamaskCypressPlugin(on: any): void {
  /**
   * Add chrome args to:
   *  - be able to connect with puppeteer
   *  - load metamask extension
   */
  on("before:browser:launch", (browser: any = {}, args: any) => {
    if (browser.name === "chrome") {
      const bundledMetamaskInfo = getBundledMetamaskInfo();
      args.push(`--load-extension=${bundledMetamaskInfo.absPath}`);
      args.push("--remote-debugging-port=9222");

      // whatever you return here becomes the new args
      return args;
    }
  });

  let puppeteerInitialized = false;
  let puppeteerBrowser: Puppeteer.Browser;
  let metamaskController: PuppeteerMetamask;

  function initCheck(): void {
    // tslint:disable-next-line
    console.assert(puppeteerInitialized, "Puppeteer not initialized. Run init() first.");
  }

  on("task", {
    init: async () => {
      const res = await fetch("http://localhost:9222/json/version");
      const config = await res.json();
      const webSocketDebuggerUrl = config.webSocketDebuggerUrl;

      puppeteerBrowser = await Puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
      });

      puppeteerInitialized = true;
      metamaskController = new PuppeteerMetamask(puppeteerBrowser, getBundledMetamaskInfo());

      return true;
    },

    isSetupNeeded: async () => {
      initCheck();

      return !puppeteerInitialized || (await metamaskController.isSetupNeeded());
    },

    setupPuppeteer: async () => {
      initCheck();

      await metamaskController.init();

      return true;
    },

    allowToConnect: async () => {
      initCheck();

      await metamaskController.allowToConnect();

      return true;
    },
    loadPrivateKey: async (key: string) => {
      initCheck();

      await metamaskController.loadPrivateKey(key);

      return true;
    },
    changeNetwork: async (network: MetamaskNetwork) => {
      initCheck();

      await metamaskController.changeNetwork(network);

      return true;
    },
    acceptTx: async () => {
      initCheck();

      await metamaskController.acceptTx();

      return true;
    },
  } as MetamaskCypressTasksHandler);
}
