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
import { click, waitForText, type, delay } from "puppeteer-better-utils";
import { passWelcomeScreenAction, initialSetupAction } from "./pages/actions";

export type MetamaskNetwork = "main" | "ropsten" | "kovan" | "rinkeby" | "localhost";
export type MetamaskStatus = "unlocked" | "locked" | "uninitialized";

export class PuppeteerMetamask {
  constructor(public browser: Puppeteer.Browser, public metamaskBundleInfo: MetamaskBundleInfo) {}

  public async init(): Promise<void> {
    await passWelcomeScreenAction(this.browser, this.metamaskBundleInfo);
    await initialSetupAction(this.browser, this.metamaskBundleInfo);
  }

  /**
   * Useful in some environments (ie. cypress dev mode) that cache browser extension data between the runs.
   */
  public async getStatus(): Promise<MetamaskStatus> {
    const page = await homePage(this.browser, this.metamaskBundleInfo);

    const hasLock = await page
      .waitFor(homePageElements.lock.visible, { timeout: 1000 })
      .then(() => true)
      .catch(() => false);

    const hasWelcomeAnnouncement = await page
      .waitFor(homePageElements.announcement.visible, { timeout: 1000 })
      .then(() => true)
      .catch(() => false);

    await page.close();

    if (hasLock) {
      return "locked";
    } else if (hasWelcomeAnnouncement) {
      return "uninitialized";
    } else {
      return "unlocked";
    }
  }

  public async unlockAccount(password: string = this.metamaskBundleInfo.walletPass): Promise<void> {
    const page = await homePage(this.browser, this.metamaskBundleInfo);
    await type(page, homePageElements.lock.passwordInput, password);
    await click(page, homePageElements.lock.unlockButton);

    await page.close();
  }

  public async loadPrivateKey(privateKey: string): Promise<void> {
    const page = await homePage(this.browser, this.metamaskBundleInfo);

    await click(page, homePageElements.accountSwitcher.button);
    await click(page, homePageElements.accountSwitcher.menuItems.importAccount);

    await type(page, importAccountPageElements.privateKeyBox, privateKey);
    await click(page, importAccountPageElements.importButton);

    await page.close();
  }

  public async changeNetwork(network: MetamaskNetwork): Promise<void> {
    const networkToPos: Dictionary<number, MetamaskNetwork> = {
      main: 0,
      ropsten: 1,
      kovan: 2,
      rinkeby: 3,
      localhost: 4,
    };

    const networkToNetworkName = (network: MetamaskNetwork): string => {
      if (network === "localhost") {
        return "Private";
      } else return startCase(network);
    };

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

  public async acceptTx(): Promise<void> {
    // i think there are some timing issues inside metamask and that's why delay is needed
    await delay(1000);
    const notificationPage = await findNotificationPage(this.browser, this.metamaskBundleInfo);
    await notificationPage.bringToFront();

    await click(notificationPage, notificationPageElements.acceptButton);
  }
}
