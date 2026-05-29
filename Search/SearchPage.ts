import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    page: Page;
    searchInput: Locator;
    autocompleteDropdown: Locator;
    showAllLink: Locator;
    firstSuggestion: Locator;
    skuInDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput          = page.getByPlaceholder('Search for products…');
        this.autocompleteDropdown = page.locator('[class*="autocomplete"], [class*="suggestion"], [class*="search-result"]').first();
        this.showAllLink          = page.getByRole('link', { name: /Show All/i });
        this.firstSuggestion      = page.locator('[class*="autocomplete"] a, [class*="suggestion"] a').first();
        this.skuInDropdown        = page.getByText(/sku/i).first();
    }

    async verifySearchInputVisible(): Promise<void> {
        await expect(this.searchInput).toBeVisible();
    }

    async verifySearchInputPlaceholder(): Promise<void> {
        await expect(this.searchInput).toHaveAttribute('placeholder', 'Search for products…');
    }

    async focusSearchInput(): Promise<void> {
        await this.searchInput.click();
    }

    async typeSearchTerm(term: string): Promise<void> {
        await this.searchInput.fill(term);
    }

    async pressEnterSearch(): Promise<void> {
        await this.searchInput.press('Enter');
    }

    async pressEscapeSearch(): Promise<void> {
        await this.searchInput.press('Escape');
    }

    async verifyAutocompleteVisible(): Promise<void> {
        await expect(this.autocompleteDropdown).toBeVisible();
    }

    async verifyAutocompleteHidden(): Promise<void> {
        await expect(this.autocompleteDropdown).not.toBeVisible();
    }

    async verifyShowAllLink(): Promise<void> {
        await expect(this.showAllLink).toBeVisible();
    }

    async verifySkuInDropdown(): Promise<void> {
        await expect(this.skuInDropdown).toBeVisible();
    }

    async clickShowAll(): Promise<void> {
        await this.showAllLink.click();
    }

    async clickFirstSuggestion(): Promise<void> {
        await this.firstSuggestion.click();
    }

    async verifyResultsPageUrl(): Promise<void> {
        await expect(this.page).toHaveURL(/allproducts|search/);
    }

    async verifyNoResultsHandled(): Promise<void> {
        await expect(this.page).not.toHaveURL('about:blank');
    }
}
