import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly btnClosePopup: Locator;
    readonly logoHomePage: Locator;
    readonly btnAddToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnClosePopup = page.locator('div.close-btn');
        this.logoHomePage = page.locator('img[alt="logo"]');
        this.btnAddToCart = page.locator('button#addToCart');
    }
}