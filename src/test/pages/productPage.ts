import { Page } from 'playwright';
import { expect } from 'chai';
import 'dotenv/config';

export class ProductPage {
    
      constructor(private page: Page) {
        this.page = page;
      }
    
    async AddProduct(product: string) {     
        product=product.toLowerCase().replace(/\s/g, '-');
        await this.page.locator("#add-to-cart-"+product).click();
    }
}