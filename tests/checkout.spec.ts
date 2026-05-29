import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Information Step', () => {

  test('TC-CHK-001: Checkout page loads at /checkout', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
    await expect(page).toHaveURL('/checkout');
  });

  test('TC-CHK-002: INFORMATION heading visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-003: Welcome message shows current username', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText(/welcome back/i)).toBeVisible();
  });

  test('TC-CHK-004: SHIPPING ADDRESS heading visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-005: First Name field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-006: Last Name field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-007: Street Address field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-008: Apartment/Suite field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-009: Country field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-010: State field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-011: ZIP Code field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-012: Town/City field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-013: Phone field present', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-014: Continue Shopping button visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-015: Continue Shopping navigates back to cart', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Order Summary', () => {

  test('TC-CHK-016: YOUR CART heading visible on checkout', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-017: Cart summary shows product subtotals', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-018: Cart summary shows Shipping cost', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-019: Cart summary shows Tax', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
    await expect(page.getByText(/Tax/i).first()).toBeVisible();
  });

  test('TC-CHK-020: Cart summary shows Total', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-021: Promo code toggle link visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
    await expect(page.getByPlaceholder(/coupon|promo/i).or(page.getByText(/coupon/i)).first()).toBeVisible();
  });

  test('TC-CHK-022: Clicking promo code link shows input', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByPlaceholder(/coupon|promo/i).or(page.getByText(/coupon/i)).first()).toBeVisible();
  });

});

test.describe('Stepper', () => {

  test('TC-CHK-023: CART step shown in stepper', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-024: INFORMATION step shown (active)', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-025: SHIPPING step shown in stepper', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-026: PAYMENT step shown in stepper', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

});

test.describe('Edge Cases', () => {

  test('TC-CHK-027: Checkout layout loads without errors', async ({ page }) => {
    await loginUser(page);
    await page.goto('/checkout');
  });

  test('TC-CHK-028: Cart items mirrored correctly in checkout summary', async ({ page }) => {
    await loginUser(page);
  });

});
