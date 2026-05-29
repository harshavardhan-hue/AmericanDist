import { Page } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { FooterPage } from './FooterPage';

export class NavigationManager {
    page: Page;
    Header: HeaderPage;
    Footer: FooterPage;

    constructor(page: Page) {
        this.page   = page;
        this.Header = new HeaderPage(page);
        this.Footer = new FooterPage(page);
    }

    getHeaderPage(): HeaderPage { return this.Header; }
    getFooterPage(): FooterPage { return this.Footer; }
}
