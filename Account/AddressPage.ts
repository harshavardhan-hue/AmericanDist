import { Page, Locator, expect } from '@playwright/test';

export class AddressPage {
    page: Page;
    addressHeading: Locator;
    newAddressButton: Locator;
    billingAddressSection: Locator;
    shippingAddressSection: Locator;
    formControl: Locator;
    formLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addressHeading        = page.getByText(/Address|Addresses/i).first();
        this.newAddressButton      = page.getByRole('button', { name: /New Address|Add.*Address/i }).or(page.getByRole('link', { name: /New Address/i }));
        this.billingAddressSection = page.getByText(/Billing Address/i).first();
        this.shippingAddressSection = page.getByText(/Shipping Address/i).first();
        this.formControl           = page.locator('.form-control').first();
        this.formLabel             = page.locator('.form-label').first();
    }

    async navigateToAddress(): Promise<void> {
        await this.page.goto('/myaccount?tab=address');
    }

    async verifyAddressHeading(): Promise<void> {
        await expect(this.addressHeading).toBeVisible();
    }

    async verifyNewAddressButton(): Promise<void> {
        await expect(this.newAddressButton).toBeVisible();
    }

    async verifyBillingAddressSection(): Promise<void> {
        await expect(this.billingAddressSection).toBeVisible();
    }

    async verifyShippingAddressSection(): Promise<void> {
        await expect(this.shippingAddressSection).toBeVisible();
    }
}
