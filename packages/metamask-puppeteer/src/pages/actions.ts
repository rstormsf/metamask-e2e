/**
 * If action gets too long inside PuppeteerMetamask, export it here.
 */

import * as Puppeteer from "puppeteer";
import { MetamaskBundleInfo } from "..";
import { click, type, get, waitForText } from "puppeteer-better-utils";
import { homePage } from "./pages";

export async function initialSetupAction(browser: Puppeteer.Browser, bundleInfo: MetamaskBundleInfo): Promise<void> {
  const page = await homePage(browser, bundleInfo);

  await click(page, "#app-content > div > div.main-container-wrapper > div > div > div > div > button");

  await click(page, "#app-content > div > div.main-container-wrapper > div > div > div > div > form > a");

  await type(
    page,
    "#app-content > div > div.main-container-wrapper > div > div > div > div > div > div.import-account__input-wrapper > textarea",
    bundleInfo.walletSeed,
  );
  await type(page, "#password", bundleInfo.walletPass);
  await type(page, "#confirm-password", bundleInfo.walletPass);

  await click(page, "#app-content > div > div.main-container-wrapper > div > div > div > div > div > button");

  const termsOfUseWrapper = await get(
    page,
    "#app-content > div > div.main-container-wrapper > div > div > div > div > div > div > div.tou__body.markdown",
  );
  await page.evaluate(termsOfUse => {
    termsOfUse.scrollTo(0, termsOfUse.scrollHeight);
    return termsOfUse.scrollHeight;
  }, termsOfUseWrapper);

  await click(
    page,
    "#app-content > div > div.main-container-wrapper > div > div > div > div > div > div > button",
    500,
  );

  await waitForText(page, ".tou__title", "Privacy Notice");
  await click(
    page,
    "#app-content > div > div.main-container-wrapper > div > div > div > div > div > div > button",
    500,
  );
  await waitForText(page, ".tou__title", "Phishing Warning");
  await click(
    page,
    "#app-content > div > div.main-container-wrapper > div > div > div > div > div > div > button",
    500,
  );

  await page.close();
}

export async function passWelcomeScreenAction(
  browser: Puppeteer.Browser,
  bundleInfo: MetamaskBundleInfo,
): Promise<void> {
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${bundleInfo.extensionId}/popup.html`);

  await click(page, "#app-content > div > section.new-ui-announcement__footer > button.positive");

  await page.close();
}
