import { Page } from 'playwright';
import { expect } from 'chai';
import 'dotenv/config';

export class LoginPage {

    // Selectores
    private readonly txtUsernameInput = '[data-test="username"]';
    private readonly txtPasswordInput = '[data-test="password"]';
    private readonly btnLoginButton = '[data-test="login-button"]';
    private readonly LbltitleProduct = '[data-test="title"]';
private readonly h3ErrorMessageError = '[data-test="error"]';

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
    
    async LoginError(message: string) {
        const text = await this.page.locator(this.h3ErrorMessageError).textContent();
        console.log(text);
        expect(text).to.equal(message);
    }
}