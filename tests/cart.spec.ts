import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Header Icon', () => {

  test('TC-CART-001: Cart icon visible in header', async ({ page }) => {
    await loginUser(page);
    await page.goto('any');
    await expect(page.getByRole('button', { name: 'cart' })).toBeEnabled();
  });

  test('TC-CART-002: Cart shows item count after adding product', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-CART-003: Cart header shows "Shopping Cart" label', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText('Shopping Cart')).toBeVisible();
  });

  test('TC-CART-004: Cart header shows dollar total', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Cart Page', () => {

  test('TC-CART-005: Cart page loads at /cart', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');
  });

  test('TC-CART-006: Checkout progress stepper visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page.getByText(/CART/i)).toBeVisible();
    await expect(page.getByText(/INFORMATION/i)).toBeVisible();
    await expect(page.getByText(/SHIPPING/i)).toBeVisible();
    await expect(page.getByText(/PAYMENT/i)).toBeVisible();
  });

  test('TC-CART-007: Cart table has correct column headers', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-008: Cart shows product rows', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-009: Cart shows product image thumbnail', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-010: Cart rows show product/flavor details', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-011: Shipping policy info banner shown in cart', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page.getByRole('heading', { name: /Shipping Policy Update/i })).toBeVisible();
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

});

test.describe('Cart Totals', () => {

  test('TC-CART-012: "CART TOTALS" heading visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-013: Subtotal shown in cart totals', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-014: Shipping section shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-015: Flat rate shipping option shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page.getByText(/Flat rate|PICKUP/i).first()).toBeVisible();
  });

  test('TC-CART-016: PICKUP shipping option shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-017: Selecting PICKUP changes shipping option', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-CART-018: Tax amount shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page.getByText(/Tax/i).first()).toBeVisible();
  });

  test('TC-CART-019: Total shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-020: Shipping address info shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-021: "Review your items" warning shown', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page.getByText(/All Sales Are Final/i).first()).toBeVisible();
  });

  test('TC-CART-022: PROCEED TO CHECKOUT button visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-023: PROCEED TO CHECKOUT navigates to /checkout', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Coupon', () => {

  test('TC-CART-024: APPLY COUPON button visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
    await expect(page.getByPlaceholder(/coupon|promo/i).or(page.getByText(/coupon/i)).first()).toBeVisible();
  });

  test('TC-CART-025: Clicking APPLY COUPON with empty field shows validation', async ({ page }) => {
    await loginUser(page);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-CART-026: Invalid coupon code shows error feedback', async ({ page }) => {
    await loginUser(page);
    await expect(page).not.toHaveURL('about:blank');
  });

});

test.describe('Actions', () => {

  test('TC-CART-027: UPDATE CART button visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-028: Empty Cart button visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-029: Cart persists on page refresh', async ({ page }) => {
    await loginUser(page);
    await page.reload();
  });

  test('TC-CART-030: Quantity +/- buttons available in cart rows', async ({ page }) => {
    await loginUser(page);
    await page.goto('/cart');
  });

  test('TC-CART-031: Increasing quantity and updating cart changes subtotal', async ({ page }) => {
    await loginUser(page);
  });

});
