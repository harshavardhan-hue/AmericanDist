import { Page } from '@playwright/test';
import { BannerPage } from './BannerPage';

export class HomeManager {
    page: Page;
    Banner: BannerPage;

    constructor(page: Page) {
        this.page   = page;
        this.Banner = new BannerPage(page);
    }

    getBannerPage(): BannerPage { return this.Banner; }
}
