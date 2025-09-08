import{test,expect}from'@playwright/test';
//import{baseUrl}from'../support/config.json';
import{testData}from '../test-data/spot-the-bugs-test-data.json';
import {PageManager} from '../pages/pageManager'; //const {testData} = JSON.parse(JSON.stringify(require('../test-data/spot-the-bugs-test-data.json')));
import config from '../support/config.json';
import { TestError, ErrorMessages } from '../utils/errorHandler';



const baseUrl = config.environments[config.defaultEnvironment].baseUrl;

// Create a test fixture for common setup
test.describe('Spot The Bug Form Tests', () => {
    let pm: PageManager;
test.beforeEach(async({page})=> {
 try {
            await page.goto(baseUrl);
            pm = new PageManager(page);
        } catch (error) {
            throw new TestError(ErrorMessages.NAVIGATION_FAILED, { 
                url: baseUrl, 
                error: error.message 
            });
        }
});
test('Validate spot the bug page', async({page})=> {
    try {
            await pm.spotTheBug().navigateToSpotTheBugPage();
            await pm.spotTheBug().validateSpotTheBugPageTitle();
        } catch (error) {
            throw new TestError(ErrorMessages.VALIDATION_FAILED, {
                step: 'Page title validation',
                error: error.message
            });
        }
});
testData.forEach(data => {
    test(`Validate spot the bug form ${data.conition}`, async({page})=> {
        try {
                await pm.spotTheBug().navigateToSpotTheBugPage();
                await pm.spotTheBug().fillForm(
                    data.firstName, 
                    data.lastName, 
                    data.phoneNumber, 
                    data.country, 
                    data.emailAddress, 
                    data.password, 
                    data.agreeToTerms
                );
                await pm.spotTheBug().validateSuccessMassage(
                    data.lastName,
                    data.phoneNumber,
                    data.emailAddress,
                    data.password
                );
            } catch (error) {
                throw new TestError(ErrorMessages.FORM_SUBMISSION_FAILED, {
                    testData: data,
                    step: error.message.includes('fillForm') ? 'Form filling' : 'Success message validation',
                    error: error.message
                });
            }
        });
});

test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
            // Capture screenshot on failure
            await page.screenshot({ 
                path: `./screenshots/failure-${Date.now()}.png`,
                fullPage: true 
            });
        }
    });
});