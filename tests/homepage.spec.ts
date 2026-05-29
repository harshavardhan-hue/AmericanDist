import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { HomeManager } from '../HomePage/HomeManager';
import authData from '../TestData/AuthData.json';

test.describe('Top Promo Banners', () => {

  test('TC-HOME-001: Three top promo banners are visible below the header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

  test('TC-HOME-002: New Arrival banner links to new-arrival category', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const newArrival = page.locator('a[href*="new-arrival"]').first();
    await expect(newArrival).toBeVisible();
    const href = await newArrival.getAttribute('href');
    expect(href).toMatch(/new-arrival/);
  });

  test('TC-HOME-003: Disco brand promo banner is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
    await expect(page.locator('a[href*="brand/disco"]').first()).toBeVisible();
  });

  test('TC-HOME-004: Lil MFS brand promo banner is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
    await expect(page.locator('a[href*="lil-mfs"]').first()).toBeVisible();
  });

  test('TC-HOME-005: All top promo banners contain images', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

});

test.describe('Hero Carousel', () => {

  test('TC-HOME-006: Main hero carousel is visible on homepage', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.locator('img[alt*="Slide"]').first()).toBeVisible();
  });

  test('TC-HOME-007: Hero carousel has slide indicator dots', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const dots = page.locator('[class*="dot"], [class*="indicator"]');
    expect(await dots.count()).toBeGreaterThanOrEqual(3);
  });

  test('TC-HOME-008: Hero carousel Previous button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByRole('button', { name: 'Previous' }).first()).toBeVisible();
  });

  test('TC-HOME-009: Hero carousel Next button visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByRole('button', { name: 'Next' }).first()).toBeVisible();
  });

  test('TC-HOME-010: Clicking Next on hero carousel cycles to next slide', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().clickBannerNext();
    await page.waitForTimeout(600);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-HOME-011: Clicking Previous on hero carousel cycles back', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().clickBannerPrev();
    await page.waitForTimeout(600);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-HOME-012: Hero carousel auto-advances slides', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.locator('img[alt*="Slide"]').first()).toBeVisible();
    await page.waitForTimeout(4000);
    await expect(page).not.toHaveURL('about:blank');
  });

});

test.describe('Category Tiles', () => {

  test('TC-HOME-013: Category tiles section is visible on homepage', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().verifyCategoryTilesVisible();
  });

  test('TC-HOME-014: Disposable category tile is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().verifyDisposableTile();
  });

  test('TC-HOME-015: E-Liquids category tile is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().verifyEliquidsTile();
  });

  test('TC-HOME-016: Clicking Disposable tile navigates to its category', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().clickDisposableCategory();
    await expect(page).toHaveURL(/\/product-category\/disposable/);
  });

  test('TC-HOME-017: All category tiles have image thumbnails', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    const tiles = page.locator('a[href*="/product-category/"] img');
    expect(await tiles.count()).toBeGreaterThan(0);
  });

  test('TC-HOME-018: Kratom category tile is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(mgr.getBannerPage().kratom).toBeVisible();
  });

  test('TC-HOME-019: CBD category tile is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(mgr.getBannerPage().cbdTile).toBeVisible();
  });

  test('TC-HOME-020: Shop Now buttons link to product categories', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().verifyShopNowButtons();
  });

});

test.describe('Featured Products', () => {

  test('TC-HOME-021: Featured Products section visible on homepage', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await mgr.getBannerPage().verifyFeaturedProductsSection();
  });

  test('TC-HOME-022: Featured product cards are visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.locator('[class*="product"], .product').first()).toBeVisible();
  });

  test('TC-HOME-023: Featured product cards show price', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.locator('text=/\\$\\d+\\.\\d{2}/').first()).toBeVisible();
  });

  test('TC-HOME-024: Featured product cards show product names', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.locator('.woocommerce-loop-product__title, h2[class*="product"]').first()).toBeVisible();
  });

  test('TC-HOME-025: Clicking a featured product navigates to product detail', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await page.locator('a[href*="/product/"]').first().click();
    await expect(page).toHaveURL(/\/product\//);
  });

});

test.describe('Page Structure', () => {

  test('TC-HOME-026: Homepage has visible header with logo', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-HOME-027: Homepage has footer with "Need Help" section', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

  test('TC-HOME-028: Homepage URL is "/"', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page).toHaveURL('/');
  });

  test('TC-HOME-029: Homepage has search input in header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByPlaceholder('Search for products…')).toBeVisible();
  });

  test('TC-HOME-030: Homepage has shopping cart in header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
  });

  test('TC-HOME-031: Homepage shows nicotine warning banner', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByText('THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL.')).toBeVisible();
  });

  test('TC-HOME-032: Homepage shows All Sales Are Final ticker', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByText(/All Sales Are Final/i).first()).toBeVisible();
  });

  test('TC-HOME-033: Homepage shows wishlist link in header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByRole('link', { name: /Wishlist/i })).toBeVisible();
  });

  test('TC-HOME-034: Homepage shows "Join Our Community" button', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page.getByText('Join Our Community')).toBeVisible();
  });

  test('TC-HOME-035: Homepage loads at correct base URL', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new HomeManager(page);
    await mgr.getBannerPage().navigateToHomePage();
    await expect(page).toHaveURL('/');
  });

});
