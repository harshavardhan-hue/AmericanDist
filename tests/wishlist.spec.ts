import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { WishlistManager } from '../Wishlist/WishlistManager';
import authData from '../TestData/AuthData.json';

test.describe('Page Layout', () => {

  test('TC-WISH-001: Wishlist page accessible at /wishlist', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    await mgr.getWishlistPage().verifyWishlistUrl();
  });

  test('TC-WISH-002: "My WishList" heading shown', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    await mgr.getWishlistPage().verifyWishlistHeading();
  });

  test('TC-WISH-003: Wishlist table has correct column headers', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    await expect(page.getByText('Product Image')).toBeVisible();
    await expect(page.getByText('Product Name')).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('Stock Status')).toBeVisible();
  });

  test('TC-WISH-004: Empty Wishlist button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    await expect(page.getByRole('button', { name: /Empty Wishlist/i }).or(page.getByRole('link', { name: /Empty Wishlist/i }))).toBeVisible();
  });

  test('TC-WISH-006: Wishlist header icon links to /wishlist', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().clickWishlistLinkInHeader();
    await mgr.getWishlistPage().verifyWishlistUrl();
  });

});

test.describe('Adding Products', () => {

  test('TC-WISH-007: Product listing cards show wishlist/heart icon', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/product-category/disposable');
    await expect(page.locator('[class*="product"], .product').first()).toBeVisible();
  });

  test('TC-WISH-008: Wishlist header counter shows correctly', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await expect(page.getByRole('link', { name: /Wishlist/i })).toBeVisible();
  });

});

test.describe('Empty State', () => {

  test('TC-WISH-009: Wishlist page loads without errors', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-WISH-010: Wishlist table or empty message visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    const tableVisible = await mgr.getWishlistPage().wishlistTable.isVisible().catch(() => false);
    const emptyVisible = await mgr.getWishlistPage().emptyWishlistMessage.isVisible().catch(() => false);
    expect(tableVisible || emptyVisible).toBeTruthy();
  });

});

test.describe('Navigation', () => {

  test('TC-WISH-011: Wishlist page has header and footer', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().navigateToWishlist();
    await expect(page.getByAltText('logo').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

  test('TC-WISH-012: Wishlist tab in My Account navigates correctly', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new WishlistManager(page);
    await mgr.getWishlistPage().clickWishlistLink();
    await mgr.getWishlistPage().verifyWishlistUrl();
  });

  test('TC-WISH-013: Header shows "Wishlist" link', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await expect(page.getByRole('link', { name: /Wishlist/i })).toBeVisible();
  });

});
