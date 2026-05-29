import { Page, Locator, expect } from '@playwright/test';

export class WishlistPage {
    page: Page;
    wishlistLink: Locator;
    wishlistHeading: Locator;
    wishlistTable: Locator;
    wishlistProductRows: Locator;
    addToCartFromWishlist: Locator;
    removeFromWishlistButtons: Locator;
    emptyWishlistMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistLink              = page.getByRole('link', { name: /Wishlist/i });
        this.wishlistHeading           = page.getByRole('heading', { name: /Wishlist/i }).first();
        this.wishlistTable             = page.locator('[class*="wishlist"] table, table.wishlist_table').first();
        this.wishlistProductRows       = page.locator('[class*="wishlist"] tr[class*="item"], table.wishlist_table tbody tr');
        this.addToCartFromWishlist     = page.getByRole('button', { name: /Add to Cart/i }).first();
        this.removeFromWishlistButtons = page.locator('[class*="remove"], button[aria-label*="remove"]');
        this.emptyWishlistMessage      = page.getByText(/No products in the wishlist|wishlist is empty/i).first();
    }

    async navigateToWishlist(): Promise<void> {
        await this.page.goto('/wishlist');
    }

    async clickWishlistLink(): Promise<void> {
        await this.wishlistLink.click();
    }

    async verifyWishlistHeading(): Promise<void> {
        await expect(this.wishlistHeading).toBeVisible();
    }

    async verifyWishlistUrl(): Promise<void> {
        await expect(this.page).toHaveURL(/wishlist/i);
    }

    async verifyWishlistTable(): Promise<void> {
        await expect(this.wishlistTable).toBeVisible();
    }

    async verifyWishlistProductRows(): Promise<void> {
        const count = await this.wishlistProductRows.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyAddToCartButton(): Promise<void> {
        await expect(this.addToCartFromWishlist).toBeVisible();
    }

    async verifyRemoveButtons(): Promise<void> {
        const count = await this.removeFromWishlistButtons.count();
        expect(count).toBeGreaterThan(0);
    }

    async clickAddToCartFromWishlist(): Promise<void> {
        await this.addToCartFromWishlist.click();
    }

    async clickWishlistLinkInHeader(): Promise<void> {
        await this.wishlistLink.click();
    }
}
