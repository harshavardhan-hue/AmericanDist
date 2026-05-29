import { Page, Locator, expect } from '@playwright/test';

export class ChangePasswordPage {
    page: Page;
    changePasswordHeading: Locator;
    newPasswordField: Locator;
    confirmPasswordField: Locator;
    changePasswordButton: Locator;
    passwordToggleIcons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.changePasswordHeading = page.getByRole('heading', { name: /Change Password/i });
        this.newPasswordField      = page.getByPlaceholder(/New Password/i).or(page.locator('input[name="new_password"]'));
        this.confirmPasswordField  = page.getByPlaceholder(/Confirm New Password/i).or(page.locator('input[name="confirm_password"]'));
        this.changePasswordButton  = page.getByRole('button', { name: /Change Password/i });
        this.passwordToggleIcons   = page.locator('[class*="eye"], [class*="toggle-password"], button[aria-label*="password"]');
    }

    async navigateToChangePassword(): Promise<void> {
        await this.page.goto('/myaccount?tab=ChangePassword');
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
        const count = await this.passwordToggleIcons.count();
        expect(count).toBeGreaterThan(0);
    }
}
