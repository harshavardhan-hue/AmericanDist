import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    page:               Page;
    usernameField:      Locator;
    passwordField:      Locator;
    loginButton:        Locator;
    eyeIcon:            Locator;
    errorMessage:       Locator;
    laterButton:        Locator;
    continueButton:     Locator;
    loginTab:           Locator;
    registrationTab:    Locator;

    constructor(page: Page) {
        this.page            = page;
        this.usernameField   = page.locator('#user_email');
        this.passwordField   = page.locator('#password');
        this.loginButton     = page.locator('button[type="submit"]').first();
        this.eyeIcon         = page.locator('.eye-icon');
        this.errorMessage    = page.locator('.error');
        this.laterButton     = page.getByRole('button', { name: 'Later' });
        this.continueButton  = page.getByRole('button', { name: 'Continue' });
        this.loginTab        = page.getByText('Login').first();
        this.registrationTab = page.getByText('Registration').first();
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('/myaccount?tab=login');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameField.click();
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async togglePasswordVisibility(): Promise<void> {
        await this.eyeIcon.click();
    }

    async verifyLoginPageLoaded(): Promise<void> {
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async verifyLoginTab(): Promise<void> {
        await expect(this.loginTab).toBeVisible();
    }

    async verifyRegistrationTab(): Promise<void> {
        await expect(this.registrationTab).toBeVisible();
    }

    async verifyErrorMessage(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }

    async dismissModals(): Promise<void> {
        try {
            await this.laterButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.laterButton.click();
        } catch { /* modal did not appear */ }
        try {
            await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.continueButton.click();
        } catch { /* modal did not appear */ }
    }

    async waitForHomePage(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async captureScreenshot(fileName: string): Promise<void> {
        await this.page.screenshot({ path: fileName, fullPage: true });
    }

    async login(username: string, password: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.dismissModals();
        await this.waitForHomePage();
    }
}
