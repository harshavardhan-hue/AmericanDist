import { Page, Locator, expect } from '@playwright/test';

export class ChangePasswordPage {
    page: Page;
    changePasswordHeading: Locator;
    newPasswordField: Locator;
    confirmPasswordField: Locator;
    changePasswordButton: Locator;
    eyeIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.changePasswordHeading = page.getByText(/Change Password/i).first();
        this.newPasswordField      = page.locator('input[name="new_password"], input[placeholder*="New Password" i], input[id*="new_password"]').first();
        this.confirmPasswordField  = page.locator('input[name="confirm_password"], input[placeholder*="Confirm" i], input[id*="confirm"]').first();
        this.changePasswordButton  = page.locator('button[type="submit"]').filter({ hasText: /Change Password/i }).or(page.getByRole('button', { name: /Change Password/i })).first();
        this.eyeIcon               = page.locator('.eye-icon');
    }

    async navigateToChangePassword(): Promise<void> {
        await this.page.goto('/myaccount?tab=changepassword');
    }

    async verifyChangePasswordHeading(): Promise<void> {
        await expect(this.changePasswordHeading).toBeVisible();
    }

    async verifyNewPasswordField(): Promise<void> {
        await expect(this.newPasswordField).toBeVisible();
    }

    async verifyConfirmPasswordField(): Promise<void> {
        await expect(this.confirmPasswordField).toBeVisible();
    }

    async verifyChangePasswordButton(): Promise<void> {
        await expect(this.changePasswordButton).toBeVisible();
    }

    async fillNewPassword(password: string): Promise<void> {
        await this.newPasswordField.fill(password);
    }

    async fillConfirmPassword(password: string): Promise<void> {
        await this.confirmPasswordField.fill(password);
    }

    async clickChangePassword(): Promise<void> {
        await this.changePasswordButton.click();
    }

    async verifyPasswordToggleIcons(): Promise<void> {
        await expect(this.eyeIcon.first()).toBeVisible();
    }
}
