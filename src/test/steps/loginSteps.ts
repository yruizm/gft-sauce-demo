import { Given, When, Then, setDefaultTimeout  } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { CustomWorld } from '../resources/support/world';

let loginPage: LoginPage;
let productPage: ProductPage;
let checkoutPage: CheckoutPage;
setDefaultTimeout(60 * 10000)

Given('que ingreso al sitio saucedemo', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.OpenURL();
});

When('ingreso el usuario {string} y clave {string}', async function (this: CustomWorld, user: string, pass: string) {
  await loginPage.Login(user, pass);
});

When('agrego el producto {string} al carrito', async function (this: CustomWorld, product: string) {
  productPage = new ProductPage(this.page);
  await loginPage.ValidateTitle('Products');
  await productPage.AddProduct(product);
});

When('ingreso los datos del comprador {string} {string} {string}', async function (this: CustomWorld, firstName: string, lastName: string, zipCode: string) {
  checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.proccedCheckout();
  await checkoutPage.CheckoutYourInformation(firstName, lastName, zipCode);
  await checkoutPage.CheckoutOverview();
});

Then('confirmo el mensaje de compra exitosa {string}', async function (this: CustomWorld, message: string) {
   await checkoutPage.CheckoutCompleted(message);
});

Then('confirmo el mensaje de error {string}', async function (this: CustomWorld, message: string) {
    await loginPage.LoginError(message);
});

Then('confirmo el inicio de sesion', async function () {
    await loginPage.ValidateTitle('Products');
});