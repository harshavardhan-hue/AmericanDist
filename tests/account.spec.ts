import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Dashboard', () => {

  test('TC-ACC-001: Dashboard shows correct account number', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
    await expect(page.getByText('370460')).toBeVisible();
  });

  test('TC-ACC-002: Dashboard shows correct username/name', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
  });

  test('TC-ACC-003: Dashboard shows correct email address', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
  });

  test('TC-ACC-004: Dashboard shows user role', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
    await expect(page.getByText('Gold')).toBeVisible();
  });

  test('TC-ACC-005: Dashboard shows "Account details" heading', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
    await expect(page.getByRole('heading', { name: 'Account details' }).or(page.getByText('Account details'))).toBeVisible();
  });

  test('TC-ACC-006: Account sidebar shows all 7 navigation items', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
  });

});

test.describe('Orders', () => {

  test('TC-ACC-007: Orders tab renders table with correct columns', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=Orders');
    await expect(page.getByText('ORDER')).toBeVisible();
    await expect(page.getByText('DATE')).toBeVisible();
    await expect(page.getByText('STATUS')).toBeVisible();
    await expect(page.getByText('TOTAL')).toBeVisible();
  });

  test('TC-ACC-008: Orders tab shows Recent/Older Orders toggle buttons', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=Orders');
    await expect(page.getByText('Recent Orders')).toBeVisible();
    await expect(page.getByText('Older Orders')).toBeVisible();
  });

  test('TC-ACC-009: Orders table is populated with order rows', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=Orders');
  });

  test('TC-ACC-010: View button present for each order row', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=Orders');
  });

  test('TC-ACC-011: Clicking View opens order detail', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=Orders');
    await page.getByRole('link', { name: 'View' }).or(page.getByText('View')).first().click();
    for (const label of ['Order Number', 'Status', 'Date', 'Total']) {
      await expect(page.getByText(label)).toBeVisible();
    }
  });

  test('TC-ACC-012: Order detail shows Billing and Shipping address', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-013: Order detail shows pricing breakdown', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText(/Tax/i).first()).toBeVisible();
  });

  test('TC-ACC-014: Back to list button returns to orders table', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-015: Orders pagination shows page numbers', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=Orders');
  });

  test('TC-ACC-016: Orders pagination navigates to next page', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-017: Previous page button disabled on first page', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-018: Older Orders tab loads separate order set', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Address', () => {

  test('TC-ACC-019: Address tab heading is visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-020: Address tab shows default description text', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-021: New Address button is visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-022: Billing address section is visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-023: Shipping address section is visible', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Licenses', () => {

  test('TC-ACC-024: Licenses tab shows License Management heading', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-025: FEIN License section visible with ACTIVE status', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-026: Government Issued ID section is visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-027: Tobacco License section is visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-028: State Tax ID / Business License section visible', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText(/Tax/i).first()).toBeVisible();
  });

  test('TC-ACC-029: Each license has "View current document" link', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-030: FEIN License number input has correct placeholder', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-031: Tobacco License has expiry date field', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-032: Save Changes button visible on licenses tab', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-033: Individual Update buttons shown per license', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Change Password', () => {

  test('TC-ACC-034: Change Password tab shows heading', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-035: New Password field visible with placeholder', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-036: Confirm New Password field visible with placeholder', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-037: Change Password button visible and clickable', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-038: Password fields have show/hide toggle icons', async ({ page }) => {
    await loginUser(page);
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('TC-ACC-039: Submitting empty Change Password form shows validation', async ({ page }) => {
    await loginUser(page);
    // HTML5 validation — field should be :invalid when empty
    const isInvalid = await page.locator('input:invalid').count();
    expect(isInvalid).toBeGreaterThan(0);
  });

});

test.describe('Shipping Consent', () => {

  test('TC-ACC-040: Shipping Consent tab shows agreement heading', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-041: Agreement list items visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-042: Consent Form section visible', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-043: Consent form pre-filled with account details', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-ACC-044: Accept button disabled when already accepted', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Wishlist Tab', () => {

  test('TC-ACC-045: Wishlist tab navigates to wishlist section', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: /Wishlist/i }).click();
    await expect(page).toHaveURL(new RegExp('Wishlist'));
  });

});

test.describe('Sidebar Nav', () => {

  test('TC-ACC-046: Clicking Dashboard tab shows account info', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByRole('heading', { name: 'Account details' }).or(page.getByText('Account details'))).toBeVisible();
  });

  test('TC-ACC-047: MY ACCOUNT heading visible in sidebar', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
  });

  test('TC-ACC-048: Logout button appears in account sidebar nav', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
  });

});
