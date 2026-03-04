import { Page } from "@playwright/test";
import { HomePage } from "../pageObjects/homePage";

export class MainClass {
    readonly page: Page;
    readonly objectHomePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.objectHomePage = new HomePage(page);
    }
    };