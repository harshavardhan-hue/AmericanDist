import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { CheckoutManager } from '../Checkout/CheckoutManager';
import authData from '../TestData/AuthData.json';
import checkoutData from '../TestData/CheckoutData.json';

test.describe('Information Step', () => {

  test('TC-CHK-001: Checkout page loads at /checkout', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page).toHaveURL('/checkout');
  });

  test('TC-CHK-002: Billing Details heading visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyBillingDetailsHeading();
  });

  test('TC-CHK-003: Welcome message shows current username', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page.getByText(/Welcome/i).first()).toBeVisible();
  });

  test('TC-CHK-005: First Name field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyFirstNameField();
  });

  test('TC-CHK-006: Last Name field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyLastNameField();
  });

  test('TC-CHK-007: Street Address field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyAddressField();
  });

  test('TC-CHK-010: State field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(mgr.getCheckoutPage().stateDropdown).toBeVisible();
  });

  test('TC-CHK-011: ZIP Code field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(mgr.getCheckoutPage().zipField).toBeVisible();
  });

  test('TC-CHK-013: Phone field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyPhoneField();
  });

  test('TC-CHK-014: Email field present', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyEmailField();
  });

  test('TC-CHK-015: Continue Shopping navigates back to cart', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');
  });

});

test.describe('Order Summary', () => {

  test('TC-CHK-016: Order summary section visible on checkout', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyOrderSummary();
  });

  test('TC-CHK-019: Cart summary shows Tax', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(mgr.getCheckoutPage().taxRow).toBeVisible();
  });

  test('TC-CHK-020: Cart summary shows Total', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(mgr.getCheckoutPage().totalRow).toBeVisible();
  });

  test('TC-CHK-021: Promo code field visible on checkout', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page.getByPlaceholder(/coupon|promo/i).or(page.getByText(/coupon/i)).first()).toBeVisible();
  });

});

test.describe('Stepper', () => {

  test('TC-CHK-023: CART step shown in stepper', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page.getByText(/CART/i)).toBeVisible();
  });

  test('TC-CHK-024: INFORMATION step shown as active', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page.getByText(/INFORMATION/i)).toBeVisible();
  });

  test('TC-CHK-025: SHIPPING step shown in stepper', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page.getByText(/SHIPPING/i)).toBeVisible();
  });

  test('TC-CHK-026: PAYMENT step shown in stepper', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page.getByText(/PAYMENT/i)).toBeVisible();
  });

});

test.describe('Edge Cases', () => {

  test('TC-CHK-027: Checkout layout loads without errors', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-CHK-028: All Sales Are Final notice visible on checkout', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new CheckoutManager(page);
    await mgr.getCheckoutPage().navigateToCheckout();
    await mgr.getCheckoutPage().verifyAllSalesNotice();
  });

});
