import { Given, Then, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { MainClass } from "../../config/shivohamGifts.main";
import { validateHomePage, validateSaveCartAPIResponse } from "../../pages/homePageFunctions";

Given('Navigate to url {string}', async function (url) {
    await this.page.goto(url, { timeout: 60 * 1000, waitUntil: 'domcontentloaded' });
    this.mainObject = new MainClass(this.page);
});

Then('validate the title is coming as {string}', async function (title) {
  console.log(title);
  await validateHomePage(this.page, this.mainObject);
  await validateSaveCartAPIResponse(this.page, this.mainObject);
});

setDefaultTimeout(60 * 1000);