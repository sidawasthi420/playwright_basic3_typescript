import { expect, Locator, Page } from "@playwright/test";
import { MainClass } from "../config/shivohamGifts.main";

export const validateHomePage = async (page: Page, mainObject: MainClass): Promise<void> => {

  // prefer waiting for a specific element instead of networkidle
  await mainObject.objectHomePage.logoHomePage.nth(0).waitFor({ state: 'visible', timeout: 60 * 1000 });
  expect(await mainObject.objectHomePage.logoHomePage.nth(0).isVisible()).toBeTruthy();
};

export const validateSaveCartAPIResponse = async (page: Page, mainObject: MainClass): Promise<void> => {

  await mainObject.objectHomePage.btnAddToCart.nth(1).waitFor({ state: "visible" });
  // wait for any preloader/overlay to disappear before clicking
  await page.locator('div.preloader-wrapper').waitFor({ state: 'hidden', timeout: 60 * 1000 }).catch(() => {});
  await mainObject.objectHomePage.btnAddToCart.nth(1).click();

  await getFulfilledResponse(page,'save_cart.php').then((response) => {
    expect(response.parsed.status).toBe("success");
    // console.log("API response validated successfully:", response);
  });
};

export const getFulfilledResponse = async (page: Page,api: String): Promise<any> => {
  const response = await page.waitForResponse(r =>
    r.url().includes(`${api}`)
  );

  const text = await response.text();         // always succeeds
  // console.log('save_cart.php returned →\n', text);

  // the server currently sends two JSON objects back‑to‑back.
  // split them and keep the last one (which contains the status).
  const pieces = text
    .trim()
    .split(/}(?=\s*{)/)                     // split between `} {`
    .map((p, i, arr) => (i < arr.length - 1 ? p + '}' : p));

  let body: any;
  try {
    body = JSON.parse(pieces[pieces.length - 1]);   // parse status object
  } catch {
    throw new Error('save_cart.php response was not valid JSON');
  }

  expect(body.status).toBe('success');
  return { raw: text, parsed: body, all: pieces.map(p => JSON.parse(p)) };
};