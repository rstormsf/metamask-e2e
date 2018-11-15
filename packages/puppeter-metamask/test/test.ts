import * as Puppeteer from "puppeteer";
import { launchPuppeteerWithMetamask, setupMetamask } from "../src";
import { click } from "../src/pages/utils";

async function main(): Promise<void> {
  const browser = await launchPuppeteerWithMetamask(Puppeteer, { headless: false });
  const metamaskController = await setupMetamask(browser);

  const oasisPage = await browser.newPage();
  await oasisPage.goto("https://oasis.direct");

  await metamaskController.loadPrivateKey("0x1ff8271bf14ac9bef0b641cced40dc2a7ebd2e37d8e16d25b4aa1911364219af");
  await metamaskController.changeNetwork("kovan");

  await click(
    oasisPage,
    "#root > section > section.Content > main > div.Widget > section > div.decorator > div > ul > li:nth-child(1) > div > button",
  );

  await metamaskController.allowToConnect();
  await oasisPage.bringToFront();

  // tslint:disable-next-line
  console.log("Done!");
}

main().catch(e => {
  // tslint:disable-next-line
  console.error(e);
});
