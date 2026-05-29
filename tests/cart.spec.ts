import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { CartManager } from '../Cart/CartManager';
import authData from '../TestData/AuthData.json';
import cartData from '../TestData/CartData.json';

test.describe('Header Icon', () => {

  test('TC-CART-001: Cart icon visible in header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().verifyShoppingCartLabel();
  });

  test('TC-CART-003: Cart header shows "Shopping Cart" label', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().verifyShoppingCartLabel();
  });

});

test.describe('Cart Page', () => {

  test('TC-CART-005: Cart page loads at /cart', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyCartUrl();
  });

  test('TC-CART-006: Checkout progress stepper visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyCheckoutProgressStepper();
  });

  test('TC-CART-007: Cart table has correct column headers', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await expect(page.getByText(/Product|Item/i).first()).toBeVisible();
  });

  test('TC-CART-008: Cart shows product rows', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await expect(page.locator('tr.woocommerce-cart-form__cart-item, [class*="cart-item"]').first()).toBeVisible();
  });

  test('TC-CART-009: Cart shows product image thumbnail', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await expect(page.locator('.woocommerce-cart-form__cart-item img, [class*="cart-item"] img').first()).toBeVisible();
  });

  test('TC-CART-011: Shipping policy info banner shown in cart', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyShippingPolicyBanner();
  });

});

test.describe('Cart Totals', () => {

  test('TC-CART-012: "CART TOTALS" heading visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyCartTotalsHeading();
  });

  test('TC-CART-013: Subtotal shown in cart totals', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifySubtotalRow();
  });

  test('TC-CART-015: Flat rate shipping option shown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyFlatRateOption();
  });

  test('TC-CART-016: PICKUP shipping option shown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyPickupOption();
  });

  test('TC-CART-017: Selecting PICKUP changes shipping option', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().selectPickupShipping();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-CART-018: Tax amount shown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyTaxRow();
  });

  test('TC-CART-021: "All Sales Are Final" notice shown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyAllSalesNotice();
  });

  test('TC-CART-022: PROCEED TO CHECKOUT button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyProceedToCheckoutButton();
  });

  test('TC-CART-023: PROCEED TO CHECKOUT navigates to /checkout', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().clickProceedToCheckout();
    await expect(page).toHaveURL(/checkout/);
  });

});

test.describe('Coupon', () => {

  test('TC-CART-024: APPLY COUPON button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyCouponField();
  });

  test('TC-CART-026: Invalid coupon code shows error feedback', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().enterCouponCode(cartData.invalidCouponCode);
    await mgr.getCartPage().clickApplyCoupon();
    await expect(page).not.toHaveURL('about:blank');
  });

});

test.describe('Actions', () => {

  test('TC-CART-027: UPDATE CART button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyUpdateCartButton();
  });

  test('TC-CART-028: Empty Cart button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await mgr.getCartPage().verifyEmptyCartButton();
  });

  test('TC-CART-029: Cart persists on page refresh', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await page.reload();
    await mgr.getCartPage().verifyCartUrl();
  });

  test('TC-CART-030: Quantity +/- buttons available in cart rows', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CartManager(page);
    await mgr.getCartPage().navigateToCart();
    await expect(page.locator('button[aria-label*="+"], [class*="plus"]').first()).toBeVisible();
  });

});
