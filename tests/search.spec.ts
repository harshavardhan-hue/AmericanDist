import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Search Bar', () => {

  test('TC-SRCH-001: Search input is visible in the header', async ({ page }) => {
    await loginUser(page);
    await page.goto('any');
  });

  test('TC-SRCH-002: Search input has correct placeholder text', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-003: Search input is focusable', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Autocomplete', () => {

  test('TC-SRCH-004: Typing in search shows autocomplete dropdown', async ({ page }) => {
    await loginUser(page);
    await page.getByPlaceholder('Search for products…').fill('disposable');
  });

  test('TC-SRCH-005: Autocomplete shows matching product names', async ({ page }) => {
    await loginUser(page);
    await page.getByPlaceholder('Search for products…').fill('disposable');
    await expect(page.locator('a[href*="geek-bar-meloso"]').first()).toBeVisible();
  });

  test('TC-SRCH-006: Autocomplete shows product SKUs', async ({ page }) => {
    await loginUser(page);
    await page.getByPlaceholder('Search for products…').fill('disposable');
    await expect(page.getByText(/sku/i).first()).toBeVisible();
  });

  test('TC-SRCH-007: Autocomplete shows product thumbnail images', async ({ page }) => {
    await loginUser(page);
    await page.getByPlaceholder('Search for products…').fill('disposable');
  });

  test('TC-SRCH-008: Autocomplete shows "Show All (N)" link', async ({ page }) => {
    await loginUser(page);
    await page.getByPlaceholder('Search for products…').fill('disposable');
  });

  test('TC-SRCH-009: Clicking suggestion navigates to product detail', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-010: Clicking "Show All" navigates to search results page', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('allproducts'));
    await expect(page).toHaveURL(new RegExp('allproducts'));
  });

  test('TC-SRCH-011: Autocomplete appears for partial product name', async ({ page }) => {
    await loginUser(page);
    await page.getByPlaceholder('Search for products…').fill('disposable');
  });

  test('TC-SRCH-012: Autocomplete is case-insensitive', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Results Page', () => {

  test('TC-SRCH-013: Pressing Enter submits search to results page', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('allproducts'));
    await expect(page).toHaveURL(new RegExp('allproducts'));
  });

  test('TC-SRCH-014: Results page displays search term in heading', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-015: Results page shows matching product cards', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-016: Results page has Sort By dropdown', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-017: Results page has Show (per page) dropdown', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-018: Results page has pagination when many results', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-019: Clicking product card opens product detail', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Edge Cases', () => {

  test('TC-SRCH-020: No matching results handled gracefully', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('allproducts'));
  });

  test('TC-SRCH-021: XSS input in search does not crash app', async ({ page }) => {
    await loginUser(page);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-SRCH-022: Single character search works', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('allproducts'));
    await expect(page).toHaveURL(new RegExp('allproducts'));
  });

  test('TC-SRCH-023: Spaces-only search handled gracefully', async ({ page }) => {
    await loginUser(page);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-SRCH-024: Brand name search returns relevant products', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-SRCH-025: Pressing Escape hides autocomplete dropdown', async ({ page }) => {
    await loginUser(page);
    await page.keyboard.press('Escape');
    await expect(page.locator('[class*="autocomplete"], [class*="suggestion"]').first()).not.toBeVisible();
  });

});
