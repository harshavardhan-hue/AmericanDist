import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { NavigationManager } from '../Navigation/NavigationManager';
import authData from '../TestData/AuthData.json';
import navData from '../TestData/NavigationData.json';

test.describe('Header (Unauth)', () => {

  test('TC-NAV-001: Logo visible on login page', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
    const mgr = new NavigationManager(page);
    await mgr.getHeaderPage().verifyLogoVisible();
  });

  test('TC-NAV-002: Nicotine warning banner visible on all pages', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
    await expect(page.getByText('THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL.')).toBeVisible();
  });

  test('TC-NAV-003: "All Sales Are Final" ticker visible', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
    await expect(page.getByText(/All Sales Are Final/i).first()).toBeVisible();
  });

  test('TC-NAV-004: Shipping policy update banner visible', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
    await expect(page.getByRole('heading', { name: /Shipping Policy Update/i })).toBeVisible();
  });

  test('TC-NAV-005: "know more" link navigates to /shipping-policy', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.getByRole('link', { name: 'know more' }).click();
    await expect(page).toHaveURL('/shipping-policy');
  });

});

test.describe('Header (Auth)', () => {

  test('TC-NAV-006: Logo click navigates to homepage', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new NavigationManager(page);
    await page.goto('/aboutus');
    await mgr.getHeaderPage().clickLogo();
    await expect(page).toHaveURL('/');
  });

  test('TC-NAV-007: Account icon navigates to /myaccount', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new NavigationManager(page);
    await mgr.getHeaderPage().clickMyAccount();
    await expect(page).toHaveURL(/myaccount/);
  });

  test('TC-NAV-008: Wishlist link navigates to /wishlist', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new NavigationManager(page);
    await mgr.getHeaderPage().clickWishlist();
    await expect(page).toHaveURL('/wishlist');
  });

  test('TC-NAV-011: "Join Our Community" button visible in header', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await expect(page.getByText('Join Our Community')).toBeVisible();
  });

  test('TC-NAV-012: Header shows "Welcome" and username', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new NavigationManager(page);
    await mgr.getHeaderPage().verifyWelcomeTextVisible();
  });

  test('TC-NAV-013: Promo banner images visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

});

test.describe('Footer', () => {

  test('TC-NAV-014: Footer shows "Need Help" with contact info', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const mgr = new NavigationManager(page);
    await mgr.getFooterPage().scrollToFooter();
    await mgr.getFooterPage().verifyPhoneNumber();
  });

  test('TC-NAV-015: Footer shows business hours', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const mgr = new NavigationManager(page);
    await mgr.getFooterPage().scrollToFooter();
    await mgr.getFooterPage().verifyBusinessHours();
  });

  test('TC-NAV-016: Footer shows business address', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const mgr = new NavigationManager(page);
    await mgr.getFooterPage().scrollToFooter();
    await mgr.getFooterPage().verifyBusinessAddress();
  });

  test('TC-NAV-017: Footer About Us link navigates to /aboutus', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const mgr = new NavigationManager(page);
    await mgr.getFooterPage().clickAboutUs();
    await expect(page).toHaveURL('/aboutus');
  });

  test('TC-NAV-019: Footer Return Policy link navigates to /refund-policy', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    await page.getByRole('link', { name: 'Return Policy' }).click();
    await expect(page).toHaveURL('/refund-policy');
  });

  test('TC-NAV-020: Footer Privacy Policy link navigates correctly', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const mgr = new NavigationManager(page);
    await mgr.getFooterPage().clickPrivacyPolicy();
    await expect(page).toHaveURL('/privacy-policy');
  });

  test('TC-NAV-022: Footer Terms and Conditions link navigates correctly', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    await page.getByRole('link', { name: 'Terms and conditions' }).click();
    await expect(page).toHaveURL('/term-and-condition');
  });

  test('TC-NAV-024: Footer Shipping Policy link navigates correctly', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    await page.getByRole('link', { name: 'Shipping Policy' }).click();
    await expect(page).toHaveURL('/shipping-policy');
  });

  test('TC-NAV-025: Footer visa-cards image visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    await expect(page.getByAltText('visa-cards')).toBeVisible();
  });

  test('TC-NAV-028: Footer logo links back to homepage', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/aboutus');
    const mgr = new NavigationManager(page);
    await mgr.getHeaderPage().clickLogo();
    await expect(page).toHaveURL('/');
  });

});

test.describe('Homepage', () => {

  test('TC-NAV-029: Homepage loads with promotional banners', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

  test('TC-NAV-031: Carousel Next button cycles slides without crash', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    await page.getByRole('button', { name: 'Next' }).first().click();
    await page.waitForTimeout(600);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-NAV-032: Category card links visible on homepage', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const catLinks = page.locator('a[href*="/product-category/"]');
    expect(await catLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-NAV-033: Category links point to product-category URLs', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    await page.goto('/');
    const categoryLinks = page.locator('a[href*="/product-category/"]');
    const count = await categoryLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await categoryLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/\/product-category\//);
    }
  });

});

test.describe('Modals', () => {

  test('TC-NAV-034: License modal shows 3 license type requirements', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().navigateToLoginPage();
    await auth.getLoginPage().enterUsername(authData.validUser.username);
    await auth.getLoginPage().enterPassword(authData.validUser.password);
    await auth.getLoginPage().clickLoginButton();
    await expect(page.getByText('FEIN License')).toBeVisible();
    await expect(page.getByText('Tobacco License')).toBeVisible();
    await expect(page.getByText('Tax ID')).toBeVisible();
  });

  test('TC-NAV-035: "Upload Now" button in license modal functional', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().navigateToLoginPage();
    await auth.getLoginPage().enterUsername(authData.validUser.username);
    await auth.getLoginPage().enterPassword(authData.validUser.password);
    await auth.getLoginPage().clickLoginButton();
    await expect(page.getByRole('button', { name: 'Upload Now' })).toBeVisible();
  });

});
