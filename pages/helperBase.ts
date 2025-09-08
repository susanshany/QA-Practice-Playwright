import { Locator,expect, Page } from '@playwright/test';
export class HelperBase{
    readonly page: Page
    readonly elementLocator: Locator
    readonly titleLocator: Locator
    readonly title: string
    constructor(page: Page) {
        this.page = page;
    }
    async goTo(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }
    async varifyCheckboxChecked(checkBoxLocator: Locator) {
        await expect(checkBoxLocator).toBeChecked();
    }

    async clickOnElement(elementLocator: Locator) {
        await elementLocator.click();
    }
    async validatepageTitle(titleLocator: Locator, title: string) {
        await expect(titleLocator).toHaveText(title);
    }
     async waitForElementToBeVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
    async enterTextInField(locator: Locator, text: string) {
        await this.clickOnElement(locator);
        //await this.waitForElementToBeVisible(locator);
        await locator.fill(text);
        await this.inputFieldAssertText(locator, text);
    }
    async inputFieldAssertText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveValue(expectedText);
    }
    async selectOptionFromDropdown(locator: Locator, value: string) {
        await locator.selectOption({ label: value });
    }
    async getCurrentUrl(){
        return currentUrl = page.url();
        }
}