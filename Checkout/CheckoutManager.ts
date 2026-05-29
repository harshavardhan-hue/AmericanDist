import { Page } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class CheckoutManager {
    page: Page;
    Checkout: CheckoutPage;

    constructor(page: Page) {
        this.page     = page;
        this.Checkout = new CheckoutPage(page);
    }

    getCheckoutPage(): CheckoutPage { return this.Checkout; }
}
