import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    page: Page;
    accountNumberText: Locator;
    accountDetailsHeading: Locator;
    goldRoleText: Locator;
    myAccountHeading: Locator;
    dashboardLink: Locator;
    ordersLink: Locator;
    addressLink: Locator;
    licensesLink: Locator;
    changePasswordLink: Locator;
    shippingConsentLink: Locator;
    logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountNumberText    = page.getByText('370460');
        this.accountDetailsHeading = page.getByRole('heading', { name: 'Account details' });
        this.goldRoleText         = page.getByText('Gold');
        this.myAccountHeading     = page.getByText('MY ACCOUNT');
        this.dashboardLink        = page.getByRole('link', { name: /Dashboard/i });
        this.ordersLink           = page.getByRole('link', { name: /Orders/i });
        this.addressLink          = page.getByRole('link', { name: /Addresses/i });
        this.licensesLink         = page.getByRole('link', { name: /Licenses/i });
        this.changePasswordLink   = page.getByRole('link', { name: /Change Password/i });
        this.shippingConsentLink  = page.getByRole('link', { name: /Shipping Consent/i });
        this.logoutLink           = page.getByRole('link', { name: /Logout/i });
    }

    async navigateToDashboard(): Promise<void> {
        await this.page.goto('/myaccount');
    }

    async verifyAccountNumber(): Promise<void> {
        await expect(this.accountNumberText).toBeVisible();
    }

    async verifyAccountDetailsHeading(): Promise<void> {
        await expect(this.accountDetailsHeading).toBeVisible();
    }

    async verifyGoldRole(): Promise<void> {
        await expect(this.goldRoleText).toBeVisible();
    }

    async verifyMyAccountHeading(): Promise<void> {
        await expect(this.myAccountHeading).toBeVisible();
    }

    async verifyAllSidebarLinks(): Promise<void> {
        await expect(this.dashboardLink).toBeVisible();
        await expect(this.ordersLink).toBeVisible();
        await expect(this.addressLink).toBeVisible();
        await expect(this.licensesLink).toBeVisible();
        await expect(this.changePasswordLink).toBeVisible();
        await expect(this.shippingConsentLink).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
    }

    async clickOrders(): Promise<void> {
        await this.ordersLink.click();
    }

    async clickAddresses(): Promise<void> {
        await this.addressLink.click();
    }

    async clickLicenses(): Promise<void> {
        await this.licensesLink.click();
    }

    async clickChangePassword(): Promise<void> {
        await this.changePasswordLink.click();
    }

    async clickShippingConsent(): Promise<void> {
        await this.shippingConsentLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }
}
