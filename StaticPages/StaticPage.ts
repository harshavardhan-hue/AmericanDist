import { Page, Locator, expect } from '@playwright/test';

export class StaticPage {
    page: Page;
    aboutUsHeading: Locator;
    contactUsHeading: Locator;
    privacyPolicyHeading: Locator;
    termsHeading: Locator;
    contactFormNameField: Locator;
    contactFormEmailField: Locator;
    contactFormMessageField: Locator;
    contactFormSubmitButton: Locator;
    contactPhoneText: Locator;
    contactEmailText: Locator;
    contactAddressText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.aboutUsHeading           = page.getByRole('heading', { name: /About Us/i }).first();
        this.contactUsHeading         = page.getByRole('heading', { name: /Contact Us|Contact/i }).first();
        this.privacyPolicyHeading     = page.getByRole('heading', { name: /Privacy Policy/i }).first();
        this.termsHeading             = page.getByRole('heading', { name: /Terms/i }).first();
        this.contactFormNameField     = page.locator('input[name*="name"], #your-name').first();
        this.contactFormEmailField    = page.locator('input[name*="email"], #your-email').first();
        this.contactFormMessageField  = page.locator('textarea[name*="message"], #your-message').first();
        this.contactFormSubmitButton  = page.getByRole('button', { name: /Send|Submit/i }).first();
        this.contactPhoneText         = page.getByText(/630-422-1915/i).first();
        this.contactEmailText         = page.getByText(/info@americandistributorsllc\.com/i).first();
        this.contactAddressText       = page.getByText(/1049 Industrial Dr/i).first();
    }

    async navigateToAboutUs(): Promise<void> {
        await this.page.goto('/about-us');
    }

    async navigateToContactUs(): Promise<void> {
        await this.page.goto('/contact-us');
    }

    async navigateToPrivacyPolicy(): Promise<void> {
        await this.page.goto('/privacy-policy');
    }

    async navigateToTerms(): Promise<void> {
        await this.page.goto('/terms-and-conditions');
    }

    async verifyAboutUsHeading(): Promise<void> {
        await expect(this.aboutUsHeading).toBeVisible();
    }

    async verifyContactUsHeading(): Promise<void> {
        await expect(this.contactUsHeading).toBeVisible();
    }

    async verifyPrivacyPolicyHeading(): Promise<void> {
        await expect(this.privacyPolicyHeading).toBeVisible();
    }

    async verifyContactFormFields(): Promise<void> {
        await expect(this.contactFormNameField).toBeVisible();
        await expect(this.contactFormEmailField).toBeVisible();
        await expect(this.contactFormMessageField).toBeVisible();
        await expect(this.contactFormSubmitButton).toBeVisible();
    }

    async verifyContactPhoneNumber(): Promise<void> {
        await expect(this.contactPhoneText).toBeVisible();
    }

    async verifyContactEmailAddress(): Promise<void> {
        await expect(this.contactEmailText).toBeVisible();
    }

    async verifyContactAddress(): Promise<void> {
        await expect(this.contactAddressText).toBeVisible();
    }

    async fillContactForm(name: string, email: string, message: string): Promise<void> {
        await this.contactFormNameField.fill(name);
        await this.contactFormEmailField.fill(email);
        await this.contactFormMessageField.fill(message);
    }

    async submitContactForm(): Promise<void> {
        await this.contactFormSubmitButton.click();
    }
}
