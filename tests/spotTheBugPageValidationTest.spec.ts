import{test,expect}from'@playwright/test';
import{baseUrl}from'../support/config.json';
import{testData}from '../test-data/spot-the-bugs-test-data.json';
import {PageManager}from '../page-objects/pageManager';
//const {testData} = JSON.parse(JSON.stringify(require('../test-data/spot-the-bugs-test-data.json')));
test.beforeEach(async({page})=> {

   await page.goto(baseUrl)
   
})
test('Validate spot the bug page', async({page})=> {
const pm = new PageManager(page)
    await pm.spotTheBug().navigateToSpotTheBugPage()
    await pm.spotTheBug().validateSpotTheBugPageTitle()
});
for (const data of testData) {
    test(`Validate spot the bug form ${data.conition}`, async({page})=> {
        const pm = new PageManager(page)
            await pm.spotTheBug().navigateToSpotTheBugPage()
            await pm.spotTheBug().enterFirstName(data.firstName)
            await pm.spotTheBug().enterLastName(data.lastName)
            await pm.spotTheBug().enterPhoneNumber(data.phoneNumber)
            await pm.spotTheBug().enterEmailAddress(data.emailAddress)
            await pm.spotTheBug().enterPassword(data.password)
            await pm.spotTheBug().agreeToTerms(data.agreeToTerms)
            await pm.spotTheBug().clickOnRegister()
            await pm.spotTheBug().validateSuccessMassage(data.lastName,data.phoneNumber,data.emailAddress,data.password)

        });
}
