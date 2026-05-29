import { Page, Locator, expect } from '@playwright/test';

export class HeaderPage {
    page: Page;
    logoLink: Locator;
    logoImage: Locator;
    searchInput: Locator;
    cartIcon: Locator;
    wishlistLink: Locator;
    myAccountLink: Locator;
    welcomeText: Locator;
    shoppingCartText: Locator;
    mainNavLinks: Locator;
    shopLink: Locator;
    dispensableLink: Locator;
    needHelpHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoLink          = page.getByRole('link', { name: 'logo' }).first();
        this.logoImage         = page.getByAltText('logo').first();
        this.searchInput       = page.getByPlaceholder('Search for products…');
        this.cartIcon          = page.getByRole('button', { name: /cart/i }).or(page.locator('[class*="cart-icon"]')).first();
        this.wishlistLink      = page.getByRole('link', { name: /Wishlist/i });
        this.myAccountLink     = page.getByRole('link', { name: /My Account|Account/i }).first();
        this.welcomeText       = page.getByText(/Welcome/i).first();
        this.shoppingCartText  = page.getByText('Shopping Cart');
        this.mainNavLinks      = page.locator('nav a, header nav a');
        this.shopLink          = page.getByRole('link', { name: /^Shop$/i });
        this.dispensableLink   = page.locator('a[href*="/product-category/"]').first();
        this.needHelpHeading   = page.getByRole('heading', { name: 'Need Help' });
    }

    async verifyLogoVisible(): Promise<void> {
        await expect(this.logoImage).toBeVisible();
    }

    async verifySearchInputVisible(): Promise<void> {
        await expect(this.searchInput).toBeVisible();
    }

    async verifyCartIconVisible(): Promise<void> {
        await expect(this.shoppingCartText).toBeVisible();
    }

    async verifyWishlistLinkVisible(): Promise<void> {
        await expect(this.wishlistLink).toBeVisible();
    }

    async verifyWelcomeTextVisible(): Promise<void> {
        await expect(this.welcomeText).toBeVisible();
    }

    async verifyNeedHelpHeading(): Promise<void> {
        await expect(this.needHelpHeading).toBeVisible();
    }

    async clickLogo(): Promise<void> {
        await this.logoLink.click();
    }

    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickWishlist(): Promise<void> {
        await this.wishlistLink.click();
    }
}
