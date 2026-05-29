import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
    page: Page;
    productNameHeading: Locator;
    skuText: Locator;
    priceText: Locator;
    addToCartButton: Locator;
    flavorHeader: Locator;
    priceHeader: Locator;
    stockHeader: Locator;
    quantityHeader: Locator;
    plusButtons: Locator;
    minusButtons: Locator;
    galleryImage: Locator;
    prevGalleryButton: Locator;
    nextGalleryButton: Locator;
    recommendedSection: Locator;
    categoryLinks: Locator;
    allSalesNotice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productNameHeading  = page.locator('h1.product_title, h1[class*="product"]').first();
        this.skuText             = page.getByText(/sku/i).first();
        this.priceText           = page.locator('text=/\\$\\d+\\.\\d{2}/').first();
        this.addToCartButton     = page.getByRole('button', { name: /Add to Cart/i });
        this.flavorHeader        = page.getByText(/Flavor/i).first();
        this.priceHeader         = page.getByText(/Price/i).first();
        this.stockHeader         = page.getByText(/Stock/i).first();
        this.quantityHeader      = page.getByText(/Quantity/i).first();
        this.plusButtons         = page.locator('button[aria-label*="+"], button:has-text("+"), [class*="plus"]');
        this.minusButtons        = page.locator('button[aria-label*="-"], button:has-text("-"), [class*="minus"]');
        this.galleryImage        = page.locator('.woocommerce-product-gallery img, [class*="gallery"] img').first();
        this.prevGalleryButton   = page.getByRole('button', { name: 'Previous' }).first();
        this.nextGalleryButton   = page.getByRole('button', { name: 'Next' }).first();
        this.recommendedSection  = page.getByText(/recommended|related/i).first();
        this.categoryLinks       = page.locator('a[href*="/product-category/"]');
        this.allSalesNotice      = page.getByText(/all purchases are final|all sales are final/i).first();
    }

    async navigateToProduct(slug: string): Promise<void> {
        await this.page.goto(`/product/${slug}`);
    }

    async verifyProductNameHeading(): Promise<void> {
        await expect(this.productNameHeading).toBeVisible();
    }

    async verifySkuVisible(): Promise<void> {
        await expect(this.skuText).toBeVisible();
    }

    async verifyPriceVisible(): Promise<void> {
        await expect(this.priceText).toBeVisible();
    }

    async verifyVariantTableHeaders(): Promise<void> {
        await expect(this.flavorHeader).toBeVisible();
        await expect(this.priceHeader).toBeVisible();
        await expect(this.stockHeader).toBeVisible();
        await expect(this.quantityHeader).toBeVisible();
    }

    async verifyAddToCartDisabled(): Promise<void> {
        await expect(this.addToCartButton).toBeDisabled();
    }

    async verifyAddToCartEnabled(): Promise<void> {
        await expect(this.addToCartButton).toBeEnabled();
    }

    async clickPlusButton(): Promise<void> {
        await this.plusButtons.first().click();
    }

    async clickMinusButton(): Promise<void> {
        await this.minusButtons.first().click();
    }

    async verifyGalleryImage(): Promise<void> {
        await expect(this.galleryImage).toBeVisible();
    }

    async verifyGalleryNavButtons(): Promise<void> {
        await expect(this.prevGalleryButton).toBeVisible();
        await expect(this.nextGalleryButton).toBeVisible();
    }

    async verifyRecommendedSection(): Promise<void> {
        await expect(this.recommendedSection).toBeVisible();
    }

    async verifyCategoryLinks(): Promise<void> {
        const count = await this.categoryLinks.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyAllSalesNotice(): Promise<void> {
        await expect(this.allSalesNotice).toBeVisible();
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
