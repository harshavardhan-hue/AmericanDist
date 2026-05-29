import { Page, Locator, expect } from '@playwright/test';

export class LicensesPage {
    page: Page;
    licenseManagementHeading: Locator;
    feinSection: Locator;
    govIdSection: Locator;
    tobaccoSection: Locator;
    stateTaxSection: Locator;
    saveChangesButton: Locator;
    viewCurrentDocLinks: Locator;
    updateButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.licenseManagementHeading = page.getByRole('heading', { name: /License Management/i });
        this.feinSection              = page.getByText(/FEIN/i).first();
        this.govIdSection             = page.getByText(/Government Issued ID/i).first();
        this.tobaccoSection           = page.getByText(/Tobacco License/i).first();
        this.stateTaxSection          = page.getByText(/State Tax/i).or(page.getByText(/Business License/i)).first();
        this.saveChangesButton        = page.getByRole('button', { name: /Save Changes/i });
        this.viewCurrentDocLinks      = page.getByRole('link', { name: /View current document/i });
        this.updateButtons            = page.getByRole('button', { name: /Update/i });
    }

    async navigateToLicenses(): Promise<void> {
        await this.page.goto('/myaccount?tab=Licenses');
    }

    async verifyLicenseManagementHeading(): Promise<void> {
        await expect(this.licenseManagementHeading).toBeVisible();
    }

    async verifyFeinSection(): Promise<void> {
        await expect(this.feinSection).toBeVisible();
    }

    async verifyGovIdSection(): Promise<void> {
        await expect(this.govIdSection).toBeVisible();
    }

    async verifyTobaccoSection(): Promise<void> {
        await expect(this.tobaccoSection).toBeVisible();
    }

    async verifyStateTaxSection(): Promise<void> {
        await expect(this.stateTaxSection).toBeVisible();
    }

    async verifySaveChangesButton(): Promise<void> {
        await expect(this.saveChangesButton).toBeVisible();
    }

    async verifyViewCurrentDocLinks(): Promise<void> {
        const count = await this.viewCurrentDocLinks.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyUpdateButtons(): Promise<void> {
        const count = await this.updateButtons.count();
        expect(count).toBeGreaterThan(0);
    }
}
