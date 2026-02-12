import { Given, When, Then, setDefaultTimeout  } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/loginPage';
import { CustomWorld } from '../resources/support/world';

let loginPage: LoginPage;

//setDefaultTimeout(60 * 10000)


Given('que ingreso al sitio saucedemo', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.OpenURL();

    //await loginPage.OpenURL();
});

When('ingreso el usuario {string} y clave {string}', async function (this: CustomWorld, user: string, pass: string) {
  await loginPage.Login(user, pass);
  await loginPage.ValidateTitle('Products');
});


When('agrego el producto {string} al carrito', async function (this: CustomWorld, product: string) {
  await loginPage.AddProduct(product);
});


When('ingreso los datos del comprador {string} {string} {string}', async function (this: CustomWorld, firstName: string, lastName: string, zipCode: string) {
  await loginPage.proccedCheckout();
  await loginPage.CheckoutYourInformation(firstName, lastName, zipCode);
  await loginPage.CheckoutOverview();
});


Then('confirmo el mensaje de compra exitosa "{string}', async function (this: CustomWorld, message: string) {
   await loginPage.CheckoutCompleted();
});


