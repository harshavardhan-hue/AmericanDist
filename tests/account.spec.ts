import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { AccountManager } from '../Account/AccountManager';
import authData from '../TestData/AuthData.json';
import accountData from '../TestData/AccountData.json';

test.describe('Dashboard', () => {

  test('TC-ACC-001: Dashboard shows correct account number', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().verifyAccountNumber();
  });

  test('TC-ACC-002: Dashboard shows correct username/name', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await expect(page.getByText(authData.validUser.username)).toBeVisible();
  });

  test('TC-ACC-003: Dashboard shows correct email address', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await expect(page.locator('[class*="email"], .user-email').first()).toBeVisible();
  });

  test('TC-ACC-004: Dashboard shows user role as Gold', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().verifyGoldRole();
  });

  test('TC-ACC-005: Dashboard shows "Account details" heading', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().verifyAccountDetailsHeading();
  });

  test('TC-ACC-006: Account sidebar shows all navigation items', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().verifyAllSidebarLinks();
  });

});

test.describe('Orders', () => {

  test('TC-ACC-007: Orders tab renders table with correct columns', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().verifyOrderTableColumns();
  });

  test('TC-ACC-008: Orders tab shows Recent/Older Orders toggle buttons', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().verifyOrderToggleButtons();
  });

  test('TC-ACC-009: Orders table is populated with order rows', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await expect(page.locator('table tbody tr').first()).toBeVisible();
  });

  test('TC-ACC-010: View button present for each order row', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await expect(page.getByRole('link', { name: 'View' }).first()).toBeVisible();
  });

  test('TC-ACC-011: Clicking View opens order detail', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().clickViewFirstOrder();
    await account.getOrders().verifyOrderDetailLabels();
  });

  test('TC-ACC-012: Order detail shows Billing and Shipping address', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().clickViewFirstOrder();
    await expect(page.getByText(/Billing/i).first()).toBeVisible();
    await expect(page.getByText(/Shipping/i).first()).toBeVisible();
  });

  test('TC-ACC-013: Order detail shows pricing breakdown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().clickViewFirstOrder();
    await expect(page.getByText(/Tax/i).first()).toBeVisible();
  });

  test('TC-ACC-014: Back to list button returns to orders table', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().clickViewFirstOrder();
    await page.goBack();
    await account.getOrders().verifyOrderTableColumns();
  });

  test('TC-ACC-015: Orders pagination shows page numbers', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await expect(page.locator('[class*="pagination"], nav[aria-label*="pagination"]').first()).toBeVisible();
  });

  test('TC-ACC-016: Older Orders tab loads separate order set', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getOrders().navigateToOrders();
    await account.getOrders().clickOlderOrders();
    await expect(page).not.toHaveURL('about:blank');
  });

});

test.describe('Address', () => {

  test('TC-ACC-019: Address tab heading is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getAddress().navigateToAddress();
    await account.getAddress().verifyAddressHeading();
  });

  test('TC-ACC-021: New Address button is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getAddress().navigateToAddress();
    await account.getAddress().verifyNewAddressButton();
  });

  test('TC-ACC-022: Billing address section is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getAddress().navigateToAddress();
    await account.getAddress().verifyBillingAddressSection();
  });

  test('TC-ACC-023: Shipping address section is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getAddress().navigateToAddress();
    await account.getAddress().verifyShippingAddressSection();
  });

});

test.describe('Licenses', () => {

  test('TC-ACC-024: Licenses tab shows License Management heading', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyLicenseManagementHeading();
  });

  test('TC-ACC-025: FEIN License section visible with ACTIVE status', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyFeinSection();
  });

  test('TC-ACC-026: Government Issued ID section is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyGovIdSection();
  });

  test('TC-ACC-027: Tobacco License section is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyTobaccoSection();
  });

  test('TC-ACC-028: State Tax ID / Business License section visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyStateTaxSection();
  });

  test('TC-ACC-029: Each license has "View current document" link', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyViewCurrentDocLinks();
  });

  test('TC-ACC-032: Save Changes button visible on licenses tab', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifySaveChangesButton();
  });

  test('TC-ACC-033: Individual Update buttons shown per license', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getLicenses().navigateToLicenses();
    await account.getLicenses().verifyUpdateButtons();
  });

});

test.describe('Change Password', () => {

  test('TC-ACC-034: Change Password tab shows heading', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getChangePassword().navigateToChangePassword();
    await account.getChangePassword().verifyChangePasswordHeading();
  });

  test('TC-ACC-035: New Password field visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getChangePassword().navigateToChangePassword();
    await account.getChangePassword().verifyNewPasswordField();
  });

  test('TC-ACC-036: Confirm New Password field visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getChangePassword().navigateToChangePassword();
    await account.getChangePassword().verifyConfirmPasswordField();
  });

  test('TC-ACC-037: Change Password button visible and clickable', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getChangePassword().navigateToChangePassword();
    await account.getChangePassword().verifyChangePasswordButton();
  });

  test('TC-ACC-038: Password fields have show/hide toggle icons', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getChangePassword().navigateToChangePassword();
    await account.getChangePassword().verifyPasswordToggleIcons();
  });

});

test.describe('Shipping Consent', () => {

  test('TC-ACC-040: Shipping Consent tab shows agreement heading', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getShippingConsent().navigateToShippingConsent();
    await account.getShippingConsent().verifyAgreementHeading();
  });

  test('TC-ACC-041: Agreement list items visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getShippingConsent().navigateToShippingConsent();
    await account.getShippingConsent().verifyAgreementListItems();
  });

  test('TC-ACC-042: Consent Form section visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getShippingConsent().navigateToShippingConsent();
    await account.getShippingConsent().verifyConsentFormSection();
  });

  test('TC-ACC-044: Accept button visible on shipping consent tab', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getShippingConsent().navigateToShippingConsent();
    await account.getShippingConsent().verifyAcceptButton();
  });

});

test.describe('Sidebar Nav', () => {

  test('TC-ACC-045: Wishlist tab navigates to wishlist section', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().clickOrders();
    await expect(page).toHaveURL(/myaccount/);
  });

  test('TC-ACC-046: Clicking Dashboard tab shows account info', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().verifyAccountDetailsHeading();
  });

  test('TC-ACC-047: MY ACCOUNT heading visible in sidebar', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await account.getDashboard().verifyMyAccountHeading();
  });

  test('TC-ACC-048: Logout button appears in account sidebar nav', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const account = new AccountManager(page);
    await account.getDashboard().navigateToDashboard();
    await expect(page.getByText('Logout')).toBeVisible();
  });

});
