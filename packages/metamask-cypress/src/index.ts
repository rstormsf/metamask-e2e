export { metamaskCypressPlugin } from "./plugin";

export type MetamaskCypressTasks = "setupPuppeteer" | "allowToConnect";

export type MetamaskCypressTasksHandler = Record<MetamaskCypressTasks, Function>;
