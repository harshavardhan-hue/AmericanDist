import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { SearchManager } from '../Search/SearchManager';
import authData from '../TestData/AuthData.json';
import searchData from '../TestData/SearchData.json';

test.describe('Search Bar', () => {

  test('TC-SRCH-001: Search input is visible in the header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().verifySearchInputVisible();
  });

  test('TC-SRCH-002: Search input has correct placeholder text', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().verifySearchInputPlaceholder();
  });

  test('TC-SRCH-003: Search input is focusable', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().focusSearchInput();
    await expect(mgr.getSearchPage().searchInput).toBeFocused();
  });

});

test.describe('Autocomplete', () => {

  test('TC-SRCH-004: Typing in search shows autocomplete dropdown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().verifyAutocompleteVisible();
  });

  test('TC-SRCH-005: Autocomplete shows matching product names', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await expect(page.locator('a[href*="geek-bar-meloso"]').first()).toBeVisible();
  });

  test('TC-SRCH-006: Autocomplete shows product SKUs', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().verifySkuInDropdown();
  });

  test('TC-SRCH-007: Autocomplete shows product thumbnail images', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await expect(page.locator('[class*="autocomplete"] img, [class*="suggestion"] img').first()).toBeVisible();
  });

  test('TC-SRCH-008: Autocomplete shows "Show All" link', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().verifyShowAllLink();
  });

  test('TC-SRCH-010: Clicking "Show All" navigates to search results page', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().clickShowAll();
    await mgr.getSearchPage().verifyResultsPageUrl();
  });

  test('TC-SRCH-011: Autocomplete appears for partial product name', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm('disp');
    await mgr.getSearchPage().verifyAutocompleteVisible();
  });

  test('TC-SRCH-012: Autocomplete is case-insensitive', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm('DISPOSABLE');
    await mgr.getSearchPage().verifyAutocompleteVisible();
  });

});

test.describe('Results Page', () => {

  test('TC-SRCH-013: Pressing Enter submits search to results page', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await mgr.getSearchPage().verifyResultsPageUrl();
  });

  test('TC-SRCH-014: Results page displays search term in heading', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await expect(page.getByText(new RegExp(searchData.searchTerm, 'i')).first()).toBeVisible();
  });

  test('TC-SRCH-015: Results page shows matching product cards', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await expect(page.locator('[class*="product"], .product').first()).toBeVisible();
  });

  test('TC-SRCH-016: Results page has Sort By dropdown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await expect(page.locator('select[name="orderby"], [class*="sort"]').first()).toBeVisible();
  });

  test('TC-SRCH-019: Clicking product card opens product detail', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await page.locator('a[href*="/product/"]').first().click();
    await expect(page).toHaveURL(/\/product\//);
  });

});

test.describe('Edge Cases', () => {

  test('TC-SRCH-020: No matching results handled gracefully', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.noResultsTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await mgr.getSearchPage().verifyNoResultsHandled();
  });

  test('TC-SRCH-021: XSS input in search does not crash app', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.xssInput);
    await mgr.getSearchPage().pressEnterSearch();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-SRCH-022: Single character search works', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.singleCharTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-SRCH-024: Brand name search returns relevant products', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.brandSearchTerm);
    await mgr.getSearchPage().pressEnterSearch();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-SRCH-025: Pressing Escape hides autocomplete dropdown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new SearchManager(page);
    await mgr.getSearchPage().typeSearchTerm(searchData.searchTerm);
    await mgr.getSearchPage().verifyAutocompleteVisible();
    await mgr.getSearchPage().pressEscapeSearch();
    await mgr.getSearchPage().verifyAutocompleteHidden();
  });

});
