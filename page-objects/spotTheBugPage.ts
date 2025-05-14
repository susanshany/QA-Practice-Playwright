import { Locator, Page,expect } from '@playwright/test';
import { HelperBase } from './helperBase';
import { baseUrl } from '../support/config.json';
// This is a sample page object file for a Playwright test
export class SpotTheBugPage extends HelperBase{
   readonly menuLocator: Locator
   readonly titleLocator: Locator
   readonly title: string
   readonly firstNameLocator: Locator
   readonly lastNameLocator: Locator
   readonly phoneNumberLocator: Locator
   readonly countryLocator: Locator
   readonly emailAddressLocator: Locator
   readonly passwordLocator: Locator
   readonly agereeLocator: Locator
   readonly registerLocator: Locator
   readonly firstName: string
   readonly successMessageLocator: Locator
   readonly successMessage: string
   readonly agree: boolean
   readonly phoneNumberAlert: string
   readonly passwordAlert: string
          constructor(page:Page) {
        super( page);
        this.menuLocator = page.locator('#bugs-form');
        this.titleLocator = page.locator('h2');
        this.title = 'CHALLENGE - Spot the BUGS!';
        this.firstNameLocator = page.locator('#firstName');
        this.lastNameLocator = page.locator('#lastName');
        this.phoneNumberLocator = page.locator('#phone');
        this.countryLocator = page.locator('#countries_dropdown_menu');
        this.emailAddressLocator = page.locator('#emailAddress');
        this.passwordLocator = page.locator('#password');  
        this.agereeLocator = page.locator('#exampleCheck1'); 
        this.registerLocator = page.getByRole('button', { name: 'Register' });
        this.successMessageLocator = page.locator('#message');
        this.successMessage = 'Successfully registered the following information';
        this.phoneNumberAlert= 'The phone number should contain at least 10 characters!';
        this.passwordAlert='The password should contain between [6,20] characters!';
         }
    async navigateToSpotTheBugPage() {
        await this.clickOnElement(this.menuLocator);
        await this.page.waitForLoadState('networkidle');
    }
    
    async validateSpotTheBugPageTitle() {
        await this.validatepageTitle(this.titleLocator,this.title);
    }
    async enterFirstName(firstName: string) {
        if(firstName.length>0){
        await this.enterTextInField(this.firstNameLocator, firstName);
        }
    }
    async enterLastName(lastName: string) {
        if(lastName.length>0){
        await this.enterTextInField(this.lastNameLocator, lastName);
        }
    }
    async enterPhoneNumber(phoneNumber: string) {
        if(phoneNumber.length>0){
        await this.enterTextInField(this.phoneNumberLocator, phoneNumber);
        }
    }
    async enterEmailAddress(emailAddress: string) {
        if(emailAddress.length>0){
        await this.enterTextInField(this.emailAddressLocator, emailAddress);
        }
    }
    async enterPassword(password: string) {
        if(password.length>0){
        await this.enterTextInField(this.passwordLocator, password);
        }
    }
    async agreeToTerms(agreeToTerms: boolean) {
        if (agreeToTerms) {
        await this.clickOnElement(this.agereeLocator);
        await this.varifyCheckboxChecked(this.agereeLocator);
        }
        
    }
    async clickOnRegister() {
        await this.clickOnElement(this.registerLocator);
    }
    async validateSuccessMassage(lastName: string,phoneNumber: string,emailAddress: string,password: string) {
        if(phoneNumber.length <10){
            await expect(this.successMessageLocator).toHaveText(this.phoneNumberAlert);
        }
        else if(password.length <6 || password.length > 20){
            await expect(this.successMessageLocator).toHaveText(this.passwordAlert);
        }
        else if(lastName.length<1 ||emailAddress.length<1){
            await expect(this.successMessageLocator).not.toContainText(this.successMessage); 
        }
        else{    
            await expect(this.successMessageLocator).toHaveText(this.successMessage);
        }
    }

}