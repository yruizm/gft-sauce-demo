import { Page } from 'playwright';
import { expect } from 'chai';

import 'dotenv/config';
import { test } from 'playwright/types/test';

export class LoginPage {


    // Selectores
    private readonly txtUsernameInput = '[data-test="username"]';
    private readonly txtPasswordInput = '[data-test="password"]';
    private readonly btnLoginButton = '[data-test="login-button"]';
    private readonly LbltitleProduct = '[data-test="title"]';

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
    
    async OpenURL() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async Login(username: string, password: string) {     
        await this.page.locator(this.txtUsernameInput).fill(username);
        await this.page.locator(this.txtPasswordInput).fill(password);
        await this.page.locator(this.btnLoginButton).click();

    }

    async ValidateTitle( title: string) {
       const text = await this.page.locator(this.LbltitleProduct).textContent();
        expect(text).to.equal(title);
    }


    async AddProduct(product: string) {     
        product=product.toLowerCase().replace(/\s/g, '-');
        await this.page.locator("#add-to-cart-"+product).click();
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


    async CheckoutCompleted() {
        const text = await this.page.locator(this.LblCompleteHeader).textContent();
        expect(text).to.equal('Thank you for your order!');
    }
}