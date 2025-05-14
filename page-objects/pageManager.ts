import {Page,expect} from "@playwright/test";
import {HomePage} from "./homePage";
import {SpotTheBugPage} from "./spotTheBugPage";
export class PageManager {
    private readonly page: Page
    private readonly homePage: HomePage
    private readonly sotTheBugPage: SpotTheBugPage
    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.sotTheBugPage = new SpotTheBugPage(this.page);
    }
    home() {
        return this.homePage;
    }
    spotTheBug() {
        return this.sotTheBugPage;
    }

}