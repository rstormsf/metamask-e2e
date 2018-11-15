import * as Puppeteer from "puppeteer";
export const STANDARD_DELAY = 500;

export async function get(page: Puppeteer.Page, selector: string): Promise<Puppeteer.ElementHandle<any>> {
  await page.waitForSelector(selector);
  const handle = await page.$(selector);

  if (!handle) {
    throw new Error(`Couldnt find ${selector}`);
  }

  return handle;
}

export async function click(page: Puppeteer.Page, selector: string, delayMs?: number): Promise<void> {
  if (delayMs) {
    await delay(delayMs);
  }
  await page.waitForSelector(selector);
  await page.click(selector);
}

export async function type(page: Puppeteer.Page, selector: string, input: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.type(selector, input);
}

export async function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
}

/**
 * /**
 * This is different than page.waitFor b/c fn is executed in node context
 * @param fn — returns error string or undefined for success
 */
export async function waitFor<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: any;
  for (let i = 0; i < 5; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
    }

    await delay(STANDARD_DELAY);
  }

  throw new Error(lastError);
}

export async function waitForText(
  page: Puppeteer.Page,
  selector: string,
  expectedText: string | RegExp,
): Promise<void> {
  return waitFor(async () => {
    const actualText = await page.evaluate(
      // @ts-ignore
      selector => document.querySelector(selector) && document.querySelector(selector).textContent,
      selector,
    );

    if (typeof expectedText === "string" && actualText === expectedText) {
      return;
    } else if (expectedText instanceof RegExp && expectedText.test(actualText)) {
      return;
    }

    throw new Error(`Couldnt find ${selector} with ${expectedText}. Last value was: ${actualText}`);
  });
}
