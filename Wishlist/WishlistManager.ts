import { Page } from '@playwright/test';
import { WishlistPage } from './WishlistPage';

export class WishlistManager {
    page: Page;
    Wishlist: WishlistPage;

    constructor(page: Page) {
        this.page     = page;
        this.Wishlist = new WishlistPage(page);
    }

    getWishlistPage(): WishlistPage { return this.Wishlist; }
}
