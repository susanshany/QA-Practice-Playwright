import{test,expect}from'@playwright/test';
import{baseUrl}from'../support/config.json';
import {PageManager}from '../page-objects/pageManager';
test.beforeEach(async({page})=> {
   await page.goto(baseUrl)
})
test('navigate to home page', async({page})=> {
    const pm = new PageManager(page)
    await pm.home().validateHomePage()
});