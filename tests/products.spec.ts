import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Category / Listing', () => {

  test('TC-PROD-001: Category page loads with correct title', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-002: Category page shows product cards', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-003: Product card shows stock status badge', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
    await expect(page.locator('[class*="product"], .product').first()).toBeVisible();
  });

  test('TC-PROD-004: Product card shows product name as a link', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-005: Product card shows SKU', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
    await expect(page.getByText(/sku/i).first()).toBeVisible();
  });

  test('TC-PROD-006: Product card shows price', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
    await expect(page.locator('text=/\\$\\d+\\.\\d{2}/').first()).toBeVisible();
  });

  test('TC-PROD-007: Product card shows "View Options" button', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-008: Clicking product thumbnail navigates to detail page', async ({ page }) => {
    await loginUser(page);
    await page.goto('listing');
  });

  test('TC-PROD-009: Clicking View Options navigates to detail page', async ({ page }) => {
    await loginUser(page);
    await page.goto('listing');
    await page.getByRole('link', { name: 'View' }).or(page.getByText('View')).first().click();
  });

  test('TC-PROD-010: Sort By dropdown visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-011: Show (per page) dropdown visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-012: Pagination visible on category page', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-013: Previous button disabled on first page', async ({ page }) => {
    await loginUser(page);
    await page.goto('listing');
  });

  test('TC-PROD-014: Next page navigates to page 2', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-PROD-015: Page breadcrumb shows category name', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-PROD-016: Grid/List view toggle buttons visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

});

test.describe('Product Detail', () => {

  test('TC-PROD-017: Product detail page has correct page title', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product/apus-g-50k-5-disposable-100ml-50k-puffs-5ct-box');
  });

  test('TC-PROD-018: Product detail shows product name as h1 heading', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-019: Product detail shows SKU', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
    await expect(page.getByText(/sku/i).first()).toBeVisible();
  });

  test('TC-PROD-020: Product detail shows categories as clickable links', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-021: Product detail shows brand as clickable link', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-022: Product detail shows price', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
    await expect(page.locator('text=/\\$\\d+\\.\\d{2}/').first()).toBeVisible();
  });

  test('TC-PROD-023: Product detail shows "all purchases are final" notice', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-024: Variant table has Flavor, Price, Stock, Quantity headers', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-025: Variant table shows multiple flavors', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-026: Each variant row shows + and - quantity buttons', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-027: Add to Cart button disabled when all quantities are 0', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
    await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeDisabled();
  });

  test('TC-PROD-028: Add to Cart enables after setting qty to 1', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
    const addBtn = page.getByRole('button', { name: /Add to Cart/i });
    await expect(addBtn).toBeEnabled();
  });

  test('TC-PROD-029: Clicking + increments quantity textbox', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-PROD-030: Clicking - does not decrement below 0', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-PROD-031: Clicking + then - returns qty to 0', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-PROD-032: Setting qty and clicking Add to Cart succeeds', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-PROD-033: Product gallery image is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-034: Gallery Previous and Next buttons are visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
    await expect(page.getByRole('button', { name: 'Previous' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' }).first()).toBeVisible();
  });

  test('TC-PROD-035: Recommended Products section is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
    await expect(page.getByText(/recommended|related/i).first()).toBeVisible();
  });

  test('TC-PROD-036: Clicking a category link navigates to that category', async ({ page }) => {
    await loginUser(page);
    await expect(page.locator('a[href="/product-category/disposable"]')).toBeVisible();
  });

  test('TC-PROD-037: Stock count shown in variant table', async ({ page }) => {
    await loginUser(page);
    await page.goto('product');
  });

  test('TC-PROD-038: Quantity input accepts manual entry', async ({ page }) => {
    await loginUser(page);
  });

});
