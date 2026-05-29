import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    page: Page;
    checkoutHeading: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    companyField: Locator;
    addressField: Locator;
    cityField: Locator;
    stateDropdown: Locator;
    zipField: Locator;
    phoneField: Locator;
    emailField: Locator;
    flatRateRadio: Locator;
    pickupRadio: Locator;
    placeOrderButton: Locator;
    orderSummarySection: Locator;
    subtotalInSummary: Locator;
    taxInSummary: Locator;
    totalInSummary: Locator;
    billingDetailsHeading: Locator;
    shippingMethodHeading: Locator;
    paymentSection: Locator;
    allSalesNotice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutHeading       = page.getByRole('heading', { name: /Checkout/i }).first();
        this.firstNameField        = page.locator('#billing_first_name, input[name="billing_first_name"]');
        this.lastNameField         = page.locator('#billing_last_name, input[name="billing_last_name"]');
        this.companyField          = page.locator('#billing_company, input[name="billing_company"]');
        this.addressField          = page.locator('#billing_address_1, input[name="billing_address_1"]');
        this.cityField             = page.locator('#billing_city, input[name="billing_city"]');
        this.stateDropdown         = page.locator('#billing_state, select[name="billing_state"]');
        this.zipField              = page.locator('#billing_postcode, input[name="billing_postcode"]');
        this.phoneField            = page.locator('#billing_phone, input[name="billing_phone"]');
        this.emailField            = page.locator('#billing_email, input[name="billing_email"]');
        this.flatRateRadio         = page.locator('input[value*="flat_rate"]').or(page.getByText(/Flat rate/i)).first();
        this.pickupRadio           = page.locator('input[value*="pickup"]').or(page.getByText(/PICKUP/i)).first();
        this.placeOrderButton      = page.getByRole('button', { name: /Place Order/i });
        this.orderSummarySection   = page.getByText(/Order Summary|Your Order/i).first();
        this.subtotalInSummary     = page.getByText(/Subtotal/i).first();
        this.taxInSummary          = page.getByText(/Tax/i).first();
        this.totalInSummary        = page.getByText(/Total/i).first();
        this.billingDetailsHeading = page.getByText(/Billing Details/i).first();
        this.shippingMethodHeading = page.getByText(/Shipping Method/i).first();
        this.paymentSection        = page.getByText(/Payment/i).first();
        this.allSalesNotice        = page.getByText(/All Sales Are Final|purchases are final/i).first();
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
        await expect(this.shippingMethodHeading).toBeVisible();
    }

    async verifyFlatRateOption(): Promise<void> {
        await expect(this.flatRateRadio).toBeVisible();
    }

    async verifyPickupOption(): Promise<void> {
        await expect(this.pickupRadio).toBeVisible();
    }

    async verifyPlaceOrderButton(): Promise<void> {
        await expect(this.placeOrderButton).toBeVisible();
    }

    async verifyOrderSummary(): Promise<void> {
        await expect(this.subtotalInSummary).toBeVisible();
        await expect(this.totalInSummary).toBeVisible();
    }

    async verifyPaymentSection(): Promise<void> {
        await expect(this.paymentSection).toBeVisible();
    }

    async verifyAllSalesNotice(): Promise<void> {
        await expect(this.allSalesNotice).toBeVisible();
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
        await this.pickupRadio.click();
    }
}
