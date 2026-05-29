import { Page, Locator, expect } from '@playwright/test';

export class HeaderPage {
    page: Page;
    logoImage: Locator;
    logoLink: Locator;
    searchInput: Locator;
    cartIcon: Locator;
    wishlistLink: Locator;
    accountIcon: Locator;
    welcomeText: Locator;
    shoppingCartText: Locator;
    joinCommunityButton: Locator;
    nicotineWarningBanner: Locator;
    allSalesTicker: Locator;
    needHelpHeading: Locator;
    categoryLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoImage            = page.locator('.logoImage, img[class*="logo"]').first();
        this.logoLink             = page.locator('a[href="/"]').first();
        this.searchInput          = page.getByPlaceholder('Search for products…');
        this.cartIcon             = page.locator('[aria-label="cart"], [class*="cart"] button').first();
        this.wishlistLink         = page.locator('a[href="/wishlist"]').first();
        this.accountIcon          = page.locator('[class*="account"], a[href*="myaccount"]').first();
        this.welcomeText          = page.getByText(/Welcome/i).first();
        this.shoppingCartText     = page.getByText('Shopping Cart');
        this.joinCommunityButton  = page.getByText('Join Our Community');
        this.nicotineWarningBanner = page.getByText('THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL.');
        this.allSalesTicker       = page.getByText(/All Sales Are Final/i).first();
        this.needHelpHeading      = page.getByRole('heading', { name: 'Need Help' });
        this.categoryLinks        = page.locator('a[href*="/product-category/"]');
    }

    async verifyLogoVisible(): Promise<void> {
        await expect(this.logoImage).toBeVisible();
    }

    async verifySearchInputVisible(): Promise<void> {
        await expect(this.searchInput).toBeVisible();
    }

    async verifyShoppingCartVisible(): Promise<void> {
        await expect(this.shoppingCartText).toBeVisible();
    }

    async verifyWishlistLinkVisible(): Promise<void> {
        await expect(this.wishlistLink).toBeVisible();
    }

    async verifyWelcomeTextVisible(): Promise<void> {
        await expect(this.welcomeText).toBeVisible();
    }

    async verifyNicotineWarningBanner(): Promise<void> {
        await expect(this.nicotineWarningBanner).toBeVisible();
    }

    async verifyAllSalesTicker(): Promise<void> {
        await expect(this.allSalesTicker).toBeVisible();
    }

    async verifyNeedHelpHeading(): Promise<void> {
        await expect(this.needHelpHeading).toBeVisible();
    }

    async verifyJoinCommunityButton(): Promise<void> {
        await expect(this.joinCommunityButton).toBeVisible();
    }

    async verifyCategoryLinksCount(minCount: number): Promise<void> {
        const count = await this.categoryLinks.count();
        expect(count).toBeGreaterThanOrEqual(minCount);
    }

    async clickLogo(): Promise<void> {
        await this.logoLink.click();
    }

    async clickMyAccount(): Promise<void> {
        await this.accountIcon.click();
    }

    async clickWishlist(): Promise<void> {
        await this.wishlistLink.click();
    }
}
