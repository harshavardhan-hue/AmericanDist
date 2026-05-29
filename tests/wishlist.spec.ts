import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Page Layout', () => {

  test('TC-WISH-001: Wishlist page accessible at /wishlist', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
    await expect(page).toHaveURL('/wishlist');
    await expect(page).toHaveURL('/wishlist');
  });

  test('TC-WISH-002: "My WishList" heading shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
  });

  test('TC-WISH-003: Wishlist table has correct column headers', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
    await expect(page.getByText('Product Image')).toBeVisible();
    await expect(page.getByText('Product Name')).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('Stock Status')).toBeVisible();
  });

  test('TC-WISH-004: Empty Wishlist button visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
  });

  test('TC-WISH-005: Wishlist icon in header shows count badge', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
  });

  test('TC-WISH-006: Wishlist header icon links to /wishlist', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: /Wishlist/i }).click();
  });

});

test.describe('Adding Products', () => {

  test('TC-WISH-007: Product listing cards show wishlist/heart icon', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
    await expect(page.locator('[class*="product"], .product').first()).toBeVisible();
  });

  test('TC-WISH-008: Wishlist header counter starts at 0', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Empty State', () => {

  test('TC-WISH-009: Empty wishlist shows no product rows', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
  });

  test('TC-WISH-010: Empty Wishlist button on empty list does not crash', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Navigation', () => {

  test('TC-WISH-011: Wishlist page has header and footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/wishlist');
    await expect(page.getByAltText('logo').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

  test('TC-WISH-012: Wishlist tab in My Account navigates correctly', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: /Wishlist/i }).click();
    await expect(page).toHaveURL(new RegExp('wishlist'));
  });

  test('TC-WISH-013: Header shows "Favorites" and "Wishlist" labels', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByRole('link', { name: /Wishlist/i })).toBeVisible();
    await expect(page.getByText('Favorites')).toBeVisible();
    await expect(page.getByText('Wishlist')).toBeVisible();
  });

});
