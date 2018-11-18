import * as Puppeteer from "puppeteer";
import { launchPuppeteerWithMetamask, setupMetamask } from "metamask-puppeteer";

async function main(): Promise<void> {
  // tslint:disable-next-line
  console.log("Starting browser...");
  const browser = await launchPuppeteerWithMetamask(Puppeteer, {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  // tslint:disable-next-line
  console.log("Browser started");
  const metamaskController = await setupMetamask(browser);

  const oasisPage = await browser.newPage();
  await oasisPage.goto("https://oasis.direct");

  await metamaskController.loadPrivateKey("0x1ff8271bf14ac9bef0b641cced40dc2a7ebd2e37d8e16d25b4aa1911364219af");
  await metamaskController.changeNetwork("kovan");

  await oasisPage.waitFor(
    "#root > section > section.Content > main > div.Widget > section > div.decorator > div > ul > li:nth-child(1) > div > button",
  );
  await oasisPage.click(
    "#root > section > section.Content > main > div.Widget > section > div.decorator > div > ul > li:nth-child(1) > div > button",
  );

  await metamaskController.allowToConnect();
  await oasisPage.bringToFront();

  // tslint:disable-next-line
  console.log("Done!");
  await oasisPage.close();
  await browser.close();
}

main().catch(e => {
  // tslint:disable-next-line
  console.error(e);
  process.exit(1);
});
