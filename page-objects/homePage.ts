import { Locator, Page,expect } from '@playwright/test';
import { HelperBase } from './helperBase';
import { baseUrl } from '../support/config.json';
// This is a sample page object file for a Playwright test
export class HomePage extends HelperBase{
   //readonly page: Page
   readonly title: string
   readonly titleLocator: Locator
    constructor(page:Page) {
        super( page);
        this.titleLocator = page.locator('h1');
        this.title = 'Welcome!';
         }
    
    async validateHomePage() {
        await expect(this.titleLocator).toHaveText(this.title);
    }
}