export { metamaskCypressPlugin } from "./plugin";

export type MetamaskCypressTasks = "init" | "setupPuppeteer" | "allowToConnect" | "isSetupNeeded";

export type MetamaskCypressTasksHandler = Record<MetamaskCypressTasks, Function>;
