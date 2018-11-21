export { metamaskCypressPlugin } from "./plugin";

export type MetamaskCypressTasks = "setupPuppeteer" | "allowToConnect" | "needsSetup";

export type MetamaskCypressTasksHandler = Record<MetamaskCypressTasks, Function>;
