import { Page } from '@playwright/test';
import { CartPage } from './CartPage';

export class CartManager {
    page: Page;
    Cart: CartPage;

    constructor(page: Page) {
        this.page = page;
        this.Cart = new CartPage(page);
    }

    getCartPage(): CartPage { return this.Cart; }
}
