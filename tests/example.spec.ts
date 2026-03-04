import { test, expect } from '@playwright/test';
import { MainClass } from '../config/shivohamGifts..main';
import { validateHomePage, validateSaveCartAPIResponse } from '../pages/homePageFunctions';

test.describe('Playwright homepage', () => {
  let mainObject: MainClass;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://shivohamgifts.in/#');
    mainObject = new MainClass(page);
  });

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Shivoham Gifts - Free eCommerce Gifts and Crockeries Store/);
});

test('close popup and go to landing page', async ({ page }) => {
  await validateHomePage(page, mainObject);
  await validateSaveCartAPIResponse(page, mainObject);
});
});
