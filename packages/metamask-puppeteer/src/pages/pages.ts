import * as Puppeteer from "puppeteer";
import { MetamaskBundleInfo } from "..";
import { waitFor } from "puppeteer-better-utils";

export async function popupPage(browser: Puppeteer.Browser, bundleInfo: MetamaskBundleInfo): Promise<Puppeteer.Page> {
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${bundleInfo.extensionId}/popup.html`);

  return page;
}

export async function homePage(browser: Puppeteer.Browser, bundleInfo: MetamaskBundleInfo): Promise<Puppeteer.Page> {
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${bundleInfo.extensionId}/home.html`);

  return page;
}

export const homePageElements = {
  networkSwitcher: {
    button: "div.app-header__network-component-wrapper > div",
    networkName: "div.app-header__network-component-wrapper > div > div > div.network-name",
    nthElement: (n: number) => `.network-droppo > div > li:nth-child(${3 + n})`,
  },
  accountSwitcher: {
    button: ".account-menu__icon",
    menuItems: {
      importAccount: "#app-content > div > div.menu.account-menu > div:nth-child(7)",
    },
  },
  overlay: {
    text: "div.loading-overlay > div > span",
  },
  // home page can show announcement about "new" version on first open
  announcement: {
    visible: ".new-ui-announcement",
  },
  // ...or can be a lock screen
  lock: {
    visible: ".unlock-page",
    passwordInput: "#password",
    unlockButton: "#app-content > div > div.main-container-wrapper > div > div > button",
  },
};

export const importAccountPageElements = {
  privateKeyBox: "#private-key-box",
  importButton:
    "div.new-account__form > div > div.new-account-import-form__private-key > div.new-account-import-form__buttons > button.button.btn-primary.btn--large.new-account-create-form__button",
};

export async function findNotificationPage(
  browser: Puppeteer.Browser,
  bundleInfo: MetamaskBundleInfo,
): Promise<Puppeteer.Page> {
  return waitFor(async () => {
    const pages = await browser.pages();

    const notificationPages = pages.filter(
      p => p.url() === `chrome-extension://${bundleInfo.extensionId}/notification.html`,
    );

    // tslint:disable-next-line
    console.assert(notificationPages.length === 1, "Couldn't find notification page!");

    return notificationPages[0];
  });
}

export const notificationPageElements = {
  acceptButton:
    "div.page-container__footer > header > button.button.btn-confirm.btn--large.page-container__footer-button",
  rejectButton:
    "div.page-container__footer > header > button.button.btn-default.btn--large.page-container__footer-button",
  signTypedDataV3Button: 
    "div.request-signature__footer > button.button.btn-primary.btn--large",
  rejectTypedDataV3Button: 
    "div.request-signature__footer > button.button.btn-default.btn--large.request-signature__footer__cancel-button"
};
