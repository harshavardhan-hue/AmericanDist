import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    page: Page;
    checkoutHeading: Locator;
    billingDetailsHeading: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    companyField: Locator;
    addressField: Locator;
    cityField: Locator;
    stateDropdown: Locator;
    zipField: Locator;
    phoneField: Locator;
    emailField: Locator;
    flatRateOption: Locator;
    pickupOption: Locator;
    placeOrderButton: Locator;
    subtotalRow: Locator;
    taxRow: Locator;
    totalRow: Locator;
    couponField: Locator;
    allSalesNotice: Locator;
    cartStep: Locator;
    informationStep: Locator;
    shippingStep: Locator;
    paymentStep: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutHeading       = page.getByText(/Checkout/i).first();
        this.billingDetailsHeading = page.getByText(/Billing Details/i).or(page.locator('.tp-checkout-bill-form')).first();
        this.firstNameField        = page.locator('.custom-input[name*="first" i], input.form-control').first();
        this.lastNameField         = page.locator('.custom-input[name*="last" i], input.form-control').nth(1);
        this.companyField          = page.locator('.custom-input[name*="company" i], input[placeholder*="company" i]').first();
        this.addressField          = page.locator('.custom-input[name*="address" i], input[placeholder*="address" i]').first();
        this.cityField             = page.locator('.custom-input[name*="city" i], input[placeholder*="city" i]').first();
        this.stateDropdown         = page.locator('select[name*="state" i], .form-select').first();
        this.zipField              = page.locator('.custom-input[name*="post" i], input[placeholder*="zip" i], input[placeholder*="postal" i]').first();
        this.phoneField            = page.locator('.custom-input[name*="phone" i], input[placeholder*="phone" i]').first();
        this.emailField            = page.locator('.custom-input[name*="email" i], input[placeholder*="email" i]').first();
        this.flatRateOption        = page.getByText(/Flat rate/i).first();
        this.pickupOption          = page.getByText(/PICKUP/i).first();
        this.placeOrderButton      = page.getByRole('button', { name: /Place Order/i });
        this.subtotalRow           = page.getByText(/Subtotal/i).first();
        this.taxRow                = page.getByText(/Tax/i).first();
        this.totalRow              = page.getByText(/Total/i).first();
        this.couponField           = page.locator('input[placeholder*="coupon" i]').first();
        this.allSalesNotice        = page.getByText(/All Sales Are Final|purchases are final/i).first();
        this.cartStep              = page.getByText(/CART/i).first();
        this.informationStep       = page.getByText(/INFORMATION/i).first();
        this.shippingStep          = page.getByText(/SHIPPING/i).first();
        this.paymentStep           = page.getByText(/PAYMENT/i).first();
    }

    async navigateToCheckout(): Promise<void> {
        await this.page.goto('/checkout');
    }

    async verifyCheckoutHeading(): Promise<void> {
        await expect(this.checkoutHeading).toBeVisible();
    }

    async verifyBillingDetailsHeading(): Promise<void> {
        await expect(this.billingDetailsHeading).toBeVisible();
    }

    async verifyFirstNameField(): Promise<void> {
        await expect(this.firstNameField).toBeVisible();
    }

    async verifyLastNameField(): Promise<void> {
        await expect(this.lastNameField).toBeVisible();
    }

    async verifyAddressField(): Promise<void> {
        await expect(this.addressField).toBeVisible();
    }

    async verifyEmailField(): Promise<void> {
        await expect(this.emailField).toBeVisible();
    }

    async verifyPhoneField(): Promise<void> {
        await expect(this.phoneField).toBeVisible();
    }

    async verifyShippingMethodSection(): Promise<void> {
        await expect(this.flatRateOption).toBeVisible();
    }

    async verifyFlatRateOption(): Promise<void> {
        await expect(this.flatRateOption).toBeVisible();
    }

    async verifyPickupOption(): Promise<void> {
        await expect(this.pickupOption).toBeVisible();
    }

    async verifyPlaceOrderButton(): Promise<void> {
        await expect(this.placeOrderButton).toBeVisible();
    }

    async verifyOrderSummary(): Promise<void> {
        await expect(this.subtotalRow).toBeVisible();
        await expect(this.totalRow).toBeVisible();
    }

    async verifyAllSalesNotice(): Promise<void> {
        await expect(this.allSalesNotice).toBeVisible();
    }

    async verifyCheckoutStepper(): Promise<void> {
        await expect(this.cartStep).toBeVisible();
        await expect(this.informationStep).toBeVisible();
        await expect(this.shippingStep).toBeVisible();
        await expect(this.paymentStep).toBeVisible();
    }

    async fillFirstName(name: string): Promise<void> {
        await this.firstNameField.fill(name);
    }

    async fillLastName(name: string): Promise<void> {
        await this.lastNameField.fill(name);
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phoneField.fill(phone);
    }

    async selectPickupShipping(): Promise<void> {
        await this.pickupOption.click();
    }
}
