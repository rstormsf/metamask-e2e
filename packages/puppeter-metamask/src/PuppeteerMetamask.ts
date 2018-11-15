import * as Puppeteer from "puppeteer";
import { startCase } from "lodash";
import { Dictionary } from "ts-essentials";
import { MetamaskBundleInfo } from ".";
import {
  homePage,
  homePageElements,
  importAccountPageElements,
  findNotificationPage,
  notificationPageElements,
} from "./pages/pages";
import { click, waitForText, type, delay } from "./pages/utils";
import { passWelcomeScreenAction, initialSetupAction } from "./pages/actions";

type Network = "main" | "ropsten" | "kovan" | "rinkeby" | "localhost";

export class PuppeteerMetamask {
  constructor(public browser: Puppeteer.Browser, public metamaskBundleInfo: MetamaskBundleInfo) {}

  public async init(): Promise<void> {
    await passWelcomeScreenAction(this.browser, this.metamaskBundleInfo);
    await initialSetupAction(this.browser, this.metamaskBundleInfo);
  }

  public async loadPrivateKey(privateKey: string): Promise<void> {
    const page = await homePage(this.browser, this.metamaskBundleInfo);

    await click(page, homePageElements.accountSwitcher.button);
    await click(page, homePageElements.accountSwitcher.menuItems.importAccount);

    await type(page, importAccountPageElements.privateKeyBox, privateKey);
    await click(page, importAccountPageElements.importButton);

    await page.close();
  }

  public async changeNetwork(network: Network): Promise<void> {
    const networkToPos: Dictionary<number, Network> = {
      main: 0,
      ropsten: 1,
      kovan: 2,
      rinkeby: 3,
      localhost: 4,
    };

    const networkToNetworkName = (network: Network): string => startCase(network);

    const page = await homePage(this.browser, this.metamaskBundleInfo);

    await click(page, homePageElements.networkSwitcher.button);
    await click(page, homePageElements.networkSwitcher.nthElement(networkToPos[network]));

    await waitForText(
      page,
      homePageElements.networkSwitcher.networkName,
      new RegExp(`${networkToNetworkName(network)}`),
    );

    await page.close();
  }

  public async allowToConnect(): Promise<void> {
    // i think there are some timing issues inside metamask and that's why delay is needed
    await delay(1000);
    const notificationPage = await findNotificationPage(this.browser, this.metamaskBundleInfo);
    await notificationPage.bringToFront();

    await click(notificationPage, notificationPageElements.acceptButton);
  }
}
