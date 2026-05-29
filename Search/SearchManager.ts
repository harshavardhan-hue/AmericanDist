import { Page } from '@playwright/test';
import { SearchPage } from './SearchPage';

export class SearchManager {
    page: Page;
    Search: SearchPage;

    constructor(page: Page) {
        this.page   = page;
        this.Search = new SearchPage(page);
    }

    getSearchPage(): SearchPage { return this.Search; }
}
