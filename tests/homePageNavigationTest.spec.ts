import{test,expect}from'@playwright/test';
import {PageManager}from '../pages/pageManager';
import config from '../support/config.json';

const baseUrl = config.environments[config.defaultEnvironment].baseUrl;
test.beforeEach(async({page})=> {
   await pageManager.goto(baseUrl)
})
test('navigate to home page', async({page})=> {
    const pm = new PageManager(page)
    await pm.home().validateHomePage()
});