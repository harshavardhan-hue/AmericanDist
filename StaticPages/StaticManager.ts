import { Page } from '@playwright/test';
import { StaticPage } from './StaticPage';

export class StaticManager {
    page: Page;
    Static: StaticPage;

    constructor(page: Page) {
        this.page   = page;
        this.Static = new StaticPage(page);
    }

    getStaticPage(): StaticPage { return this.Static; }
}
