import { Page, Locator, expect } from '@playwright/test';

export class FooterPage {
    page: Page;
    footerSection: Locator;
    phoneNumber: Locator;
    emailAddress: Locator;
    businessAddress: Locator;
    mondayFridayHours: Locator;
    saturdayHours: Locator;
    sundayHours: Locator;
    aboutUsLink: Locator;
    contactUsLink: Locator;
    privacyPolicyLink: Locator;
    facebookLink: Locator;
    instagramLink: Locator;
    tiktokLink: Locator;
    youtubeLink: Locator;
    categoryLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerSection      = page.locator('footer').first();
        this.phoneNumber        = page.getByText(/630-422-1915|\(630\) 422-1915/i).first();
        this.emailAddress       = page.getByText(/info@americandistributorsllc\.com/i).first();
        this.businessAddress    = page.getByText(/1049 Industrial Dr/i).first();
        this.mondayFridayHours  = page.getByText(/Mon.*Fri|Monday.*Friday/i).first();
        this.saturdayHours      = page.getByText(/Sat|Saturday/i).first();
        this.sundayHours        = page.getByText(/Sun|Sunday/i).first();
        this.aboutUsLink        = page.getByRole('link', { name: /About Us/i });
        this.contactUsLink      = page.getByRole('link', { name: /Contact Us/i });
        this.privacyPolicyLink  = page.getByRole('link', { name: /Privacy Policy/i });
        this.facebookLink       = page.getByRole('link', { name: /Facebook/i }).or(page.locator('a[href*="facebook"]')).first();
        this.instagramLink      = page.getByRole('link', { name: /Instagram/i }).or(page.locator('a[href*="instagram"]')).first();
        this.tiktokLink         = page.getByRole('link', { name: /TikTok/i }).or(page.locator('a[href*="tiktok"]')).first();
        this.youtubeLink        = page.getByRole('link', { name: /YouTube/i }).or(page.locator('a[href*="youtube"]')).first();
        this.categoryLinks      = page.locator('footer a[href*="/product-category/"]');
    }

    async scrollToFooter(): Promise<void> {
        await this.footerSection.scrollIntoViewIfNeeded();
    }

    async verifyPhoneNumber(): Promise<void> {
        await expect(this.phoneNumber).toBeVisible();
    }

    async verifyEmailAddress(): Promise<void> {
        await expect(this.emailAddress).toBeVisible();
    }

    async verifyBusinessAddress(): Promise<void> {
        await expect(this.businessAddress).toBeVisible();
    }

    async verifyBusinessHours(): Promise<void> {
        await expect(this.mondayFridayHours).toBeVisible();
        await expect(this.saturdayHours).toBeVisible();
        await expect(this.sundayHours).toBeVisible();
    }

    async verifyAboutUsLink(): Promise<void> {
        await expect(this.aboutUsLink).toBeVisible();
    }

    async verifyContactUsLink(): Promise<void> {
        await expect(this.contactUsLink).toBeVisible();
    }

    async verifyPrivacyPolicyLink(): Promise<void> {
        await expect(this.privacyPolicyLink).toBeVisible();
    }

    async verifySocialLinks(): Promise<void> {
        await expect(this.facebookLink).toBeVisible();
        await expect(this.instagramLink).toBeVisible();
    }

    async verifyCategoryLinksInFooter(): Promise<void> {
        const count = await this.categoryLinks.count();
        expect(count).toBeGreaterThan(0);
    }

    async clickAboutUs(): Promise<void> {
        await this.aboutUsLink.click();
    }

    async clickContactUs(): Promise<void> {
        await this.contactUsLink.click();
    }

    async clickPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyLink.click();
    }
}
