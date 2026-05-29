import { Page, Locator, expect } from '@playwright/test';

export class ShippingConsentPage {
    page: Page;
    agreementHeading: Locator;
    consentFormSection: Locator;
    agreementListItems: Locator;
    acceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.agreementHeading   = page.getByText(/Shipping Consent|Consent Agreement|Agreement/i).first();
        this.consentFormSection = page.getByText(/Consent Form/i).first();
        this.agreementListItems = page.locator('ul li, ol li').first();
        this.acceptButton       = page.getByRole('button', { name: /Accept/i }).or(page.locator('button[type="submit"]').filter({ hasText: /Accept/i })).first();
    }

    async navigateToShippingConsent(): Promise<void> {
        await this.page.goto('/myaccount?tab=consent');
    }

    async verifyAgreementHeading(): Promise<void> {
        await expect(this.agreementHeading).toBeVisible();
    }

    async verifyConsentFormSection(): Promise<void> {
        await expect(this.consentFormSection).toBeVisible();
    }

    async verifyAgreementListItems(): Promise<void> {
        await expect(this.agreementListItems).toBeVisible();
    }

    async verifyAcceptButton(): Promise<void> {
        await expect(this.acceptButton).toBeVisible();
    }
}
