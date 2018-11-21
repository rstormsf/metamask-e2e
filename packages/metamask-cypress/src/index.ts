import { PuppeteerMetamask } from "metamask-puppeteer";

export { metamaskCypressPlugin } from "./plugin";

type MetamaskCypressTasks = Exclude<keyof PuppeteerMetamask, "browser" | "metamaskBundleInfo"> | "setupPuppeteer";

export type MetamaskCypressTasksHandler = Record<MetamaskCypressTasks, Function>;
