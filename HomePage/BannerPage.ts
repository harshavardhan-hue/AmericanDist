import { Page, Locator, expect } from '@playwright/test';

export class BannerPage {
    page: Page;
    heroBanner: Locator;
    bannerNextButton: Locator;
    bannerPrevButton: Locator;
    bannerDots: Locator;
    categoryTiles: Locator;
    disposableTile: Locator;
    eliquidsTile: Locator;
    kratom: Locator;
    cbdTile: Locator;
    shopNowButtons: Locator;
    featuredProductsSection: Locator;
    homepageProductCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heroBanner              = page.locator('[class*="banner"], [class*="hero"], [class*="slider"]').first();
        this.bannerNextButton        = page.locator('[class*="next"], button[aria-label*="Next"]').first();
        this.bannerPrevButton        = page.locator('[class*="prev"], button[aria-label*="Previous"]').first();
        this.bannerDots              = page.locator('[class*="dot"], [class*="indicator"]');
        this.categoryTiles           = page.locator('a[href*="/product-category/"]');
        this.disposableTile          = page.locator('a[href*="/product-category/disposable"]').first();
        this.eliquidsTile            = page.locator('a[href*="/product-category/eliquids"]').first();
        this.kratom                  = page.locator('a[href*="/product-category/kratom"]').first();
        this.cbdTile                 = page.locator('a[href*="/product-category/cbd"]').first();
        this.shopNowButtons          = page.getByRole('link', { name: /Shop Now/i });
        this.featuredProductsSection = page.getByText(/Featured Products|New Arrivals|Best Sellers/i).first();
        this.homepageProductCards    = page.locator('[class*="product"], .product').first();
    }

    async navigateToHomePage(): Promise<void> {
        await this.page.goto('/');
    }

    async verifyHeroBanner(): Promise<void> {
        await expect(this.heroBanner).toBeVisible();
    }

    async verifyBannerNavigationButtons(): Promise<void> {
        await expect(this.bannerNextButton).toBeVisible();
        await expect(this.bannerPrevButton).toBeVisible();
    }

    async clickBannerNext(): Promise<void> {
        await this.bannerNextButton.click();
    }

    async clickBannerPrev(): Promise<void> {
        await this.bannerPrevButton.click();
    }

    async verifyCategoryTilesVisible(): Promise<void> {
        const count = await this.categoryTiles.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyDisposableTile(): Promise<void> {
        await expect(this.disposableTile).toBeVisible();
    }

    async verifyEliquidsTile(): Promise<void> {
        await expect(this.eliquidsTile).toBeVisible();
    }

    async verifyShopNowButtons(): Promise<void> {
        const count = await this.shopNowButtons.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyFeaturedProductsSection(): Promise<void> {
        await expect(this.featuredProductsSection).toBeVisible();
    }

    async clickDisposableCategory(): Promise<void> {
        await this.disposableTile.click();
    }
}
