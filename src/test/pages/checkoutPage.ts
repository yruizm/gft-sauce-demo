import { Page } from 'playwright';
import { expect } from 'chai';
import 'dotenv/config';

export class CheckoutPage {

   private readonly btnShoppingCartBadge = '[data-test="shopping-cart-badge"]';
    private readonly btnCheckoutButton = '[data-test="checkout"]';
    private readonly txtFirstNameInput = '[data-test="firstName"]';
    private readonly txtLastNameInput = '[data-test="lastName"]';
    private readonly txtPostalCodeInput = '[data-test="postalCode"]';
    private readonly btnContinueButton = '[data-test="continue"]';
    private readonly btnFinishButton = '[data-test="finish"]';
    private readonly LblCompleteHeader = '[data-test="complete-header"]';
    
      constructor(private page: Page) {
        this.page = page;
      }
    

    async proccedCheckout() {     
        await this.page.locator(this.btnShoppingCartBadge).click();
         await this.page.locator(this.btnCheckoutButton).click();
    }
    
    async CheckoutYourInformation(firstName: string, lastName: string, zipCode: string) {
        await this.page.locator(this.txtFirstNameInput).fill(firstName);
        await this.page.locator(this.txtLastNameInput).fill(lastName);
        await this.page.locator(this.txtPostalCodeInput).fill(zipCode);
        await this.page.locator(this.btnContinueButton).click();
    }

    async CheckoutOverview() {
        await this.page.locator(this.btnFinishButton).click();
    }

    async CheckoutCompleted(expectedMessage: string) {
        const text = await this.page.locator(this.LblCompleteHeader).textContent();
        expect(text).to.equal(expectedMessage);
    }

}