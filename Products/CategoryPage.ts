import { Page, Locator, expect } from '@playwright/test';

export class CategoryPage {
    page: Page;
    productCards: Locator;
    stockBadge: Locator;
    priceText: Locator;
    skuText: Locator;
    viewOptionsButtons: Locator;
    sortByDropdown: Locator;
    showPerPageDropdown: Locator;
    pagination: Locator;
    nextPageButton: Locator;
    prevPageButton: Locator;
    gridViewButton: Locator;
    listViewButton: Locator;
    breadcrumb: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards        = page.locator('[class*="product"], .product, .woocommerce-loop-product');
        this.stockBadge          = page.locator('[class*="stock"], [class*="badge"]').first();
        this.priceText           = page.locator('text=/\\$\\d+\\.\\d{2}/').first();
        this.skuText             = page.getByText(/sku/i).first();
        this.viewOptionsButtons  = page.getByRole('link', { name: /View Options|Select options/i });
        this.sortByDropdown      = page.locator('select[name="orderby"], [class*="sort"]').first();
        this.showPerPageDropdown = page.locator('select[name="count"], [class*="per-page"]').first();
        this.pagination          = page.locator('.woocommerce-pagination, [class*="pagination"]').first();
        this.nextPageButton      = page.getByRole('link', { name: /Next/i }).first();
        this.prevPageButton      = page.getByRole('link', { name: /Previous|Prev/i }).first();
        this.gridViewButton      = page.locator('[class*="grid"], button[aria-label*="grid"]').first();
        this.listViewButton      = page.locator('[class*="list"], button[aria-label*="list"]').first();
        this.breadcrumb          = page.locator('.woocommerce-breadcrumb, [class*="breadcrumb"]').first();
    }

    async navigateToCategory(category: string): Promise<void> {
        await this.page.goto(`/product-category/${category}`);
    }

    async verifyProductCardsVisible(): Promise<void> {
        await expect(this.productCards.first()).toBeVisible();
    }

    async verifyStockBadge(): Promise<void> {
        await expect(this.stockBadge).toBeVisible();
    }

    async verifyPriceVisible(): Promise<void> {
        await expect(this.priceText).toBeVisible();
    }

    async verifySkuVisible(): Promise<void> {
        await expect(this.skuText).toBeVisible();
    }

    async verifyViewOptionsButtons(): Promise<void> {
        const count = await this.viewOptionsButtons.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifySortByDropdown(): Promise<void> {
        await expect(this.sortByDropdown).toBeVisible();
    }

    async verifyShowPerPageDropdown(): Promise<void> {
        await expect(this.showPerPageDropdown).toBeVisible();
    }

    async verifyPagination(): Promise<void> {
        await expect(this.pagination).toBeVisible();
    }

    async verifyGridListToggle(): Promise<void> {
        await expect(this.gridViewButton).toBeVisible();
        await expect(this.listViewButton).toBeVisible();
    }

    async verifyBreadcrumb(): Promise<void> {
        await expect(this.breadcrumb).toBeVisible();
    }

    async clickViewOptionsFirst(): Promise<void> {
        await this.viewOptionsButtons.first().click();
    }

    async clickNextPage(): Promise<void> {
        await this.nextPageButton.click();
    }
}
