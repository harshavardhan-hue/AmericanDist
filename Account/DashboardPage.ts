import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    page: Page;
    accountNumberText: Locator;
    accountDetailsHeading: Locator;
    goldRoleText: Locator;
    myAccountHeading: Locator;
    dashboardSidebarLink: Locator;
    ordersSidebarLink: Locator;
    addressSidebarLink: Locator;
    wishlistSidebarLink: Locator;
    changePasswordSidebarLink: Locator;
    shippingConsentSidebarLink: Locator;
    logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountNumberText         = page.getByText('370460');
        this.accountDetailsHeading     = page.getByText('Account details');
        this.goldRoleText              = page.getByText('Gold');
        this.myAccountHeading          = page.getByText('MY ACCOUNT');
        this.dashboardSidebarLink      = page.locator('a[href*="tab=dashboard"], [class*="sidebar"] a').filter({ hasText: 'Dashboard' }).first();
        this.ordersSidebarLink         = page.locator('a[href*="tab=Orders"], [class*="sidebar"] a').filter({ hasText: 'Orders' }).first();
        this.addressSidebarLink        = page.locator('a[href*="tab=address"], [class*="sidebar"] a').filter({ hasText: 'Address' }).first();
        this.wishlistSidebarLink       = page.locator('a[href*="tab=wishlist"], [class*="sidebar"] a').filter({ hasText: 'Wishlist' }).first();
        this.changePasswordSidebarLink = page.locator('a[href*="tab=changepassword"], [class*="sidebar"] a').filter({ hasText: /Change Password/i }).first();
        this.shippingConsentSidebarLink = page.locator('a[href*="tab=consent"], [class*="sidebar"] a').filter({ hasText: /Shipping Consent|Consent/i }).first();
        this.logoutButton              = page.getByRole('button', { name: /Logout/i }).or(page.locator('[variant="outline-danger"]')).first();
    }

    async navigateToDashboard(): Promise<void> {
        await this.page.goto('/myaccount?tab=dashboard');
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
        await expect(this.dashboardSidebarLink).toBeVisible();
        await expect(this.ordersSidebarLink).toBeVisible();
        await expect(this.addressSidebarLink).toBeVisible();
        await expect(this.wishlistSidebarLink).toBeVisible();
        await expect(this.changePasswordSidebarLink).toBeVisible();
        await expect(this.shippingConsentSidebarLink).toBeVisible();
        await expect(this.logoutButton).toBeVisible();
    }

    async clickOrders(): Promise<void> {
        await this.ordersSidebarLink.click();
    }

    async clickAddresses(): Promise<void> {
        await this.addressSidebarLink.click();
    }

    async clickChangePassword(): Promise<void> {
        await this.changePasswordSidebarLink.click();
    }

    async clickShippingConsent(): Promise<void> {
        await this.shippingConsentSidebarLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutButton.click();
    }
}
