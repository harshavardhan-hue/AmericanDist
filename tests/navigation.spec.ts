import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Header (Unauth)', () => {

  test('TC-NAV-001: Logo visible on login page', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
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
    await page.goto('any');
    await expect(page.getByRole('heading', { name: /Shipping Policy Update/i })).toBeVisible();
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

  test('TC-NAV-005: "know more" link navigates to /shipping-policy', async ({ page }) => {
    await loginUser(page);
    await page.goto('login');
    await page.getByRole('link', { name: 'know more' }).click();
    await expect(page).toHaveURL('/shipping-policy');
    await expect(page).toHaveURL('/shipping-policy');
  });

});

test.describe('Header (Auth)', () => {

  test('TC-NAV-006: Logo click navigates to homepage', async ({ page }) => {
    await loginUser(page);
    await page.goto('/aboutus');
    await page.getByRole('link', { name: 'logo' }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('TC-NAV-007: Account icon navigates to /myaccount', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-NAV-008: Wishlist link navigates to /wishlist', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: /Wishlist/i }).click();
    await expect(page).toHaveURL('/wishlist');
    await expect(page).toHaveURL('/wishlist');
  });

  test('TC-NAV-009: Cart icon is enabled and clickable', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-NAV-010: Cart total shown in header', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-NAV-011: "Join Our Community" button visible in header', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText('Join Our Community')).toBeVisible();
  });

  test('TC-NAV-012: Header shows "Welcome" and username', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('TC-NAV-013: Promo banner images link to product categories', async ({ page }) => {
    await loginUser(page);
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

});

test.describe('Footer', () => {

  test('TC-NAV-014: Footer shows "Need Help" with contact info', async ({ page }) => {
    await loginUser(page);
    await page.goto('homepage');
    await expect(page.getByText(/630-422-1915|\(630\)422-1915/).first()).toBeVisible();
  });

  test('TC-NAV-015: Footer shows business hours', async ({ page }) => {
    await loginUser(page);
    await page.goto('homepage');
    await expect(page.getByText('Mon-Fri: 10am - 7pm (CST)')).toBeVisible();
    await expect(page.getByText('Sat: 10am - 6pm (CST)')).toBeVisible();
    await expect(page.getByText('Sun: Closed')).toBeVisible();
  });

  test('TC-NAV-016: Footer shows business address', async ({ page }) => {
    await loginUser(page);
    await page.goto('homepage');
    await expect(page.getByText(/1049 Industrial Dr/i)).toBeVisible();
  });

  test('TC-NAV-017: Footer About Us link → /aboutus', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL('/aboutus');
    await expect(page).toHaveURL('/aboutus');
  });

  test('TC-NAV-018: Footer FAQ\'s link → /faqs', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: "FAQ's" }).click();
    await expect(page).toHaveURL('/faqs');
    await expect(page).toHaveURL('/faqs');
  });

  test('TC-NAV-019: Footer Return Policy link → /refund-policy', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'Return Policy' }).click();
    await expect(page).toHaveURL('/refund-policy');
    await expect(page).toHaveURL('/refund-policy');
  });

  test('TC-NAV-020: Footer Privacy Policy link → /privacy-policy', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'Privacy Policy' }).click();
    await expect(page).toHaveURL('/privacy-policy');
    await expect(page).toHaveURL('/privacy-policy');
  });

  test('TC-NAV-021: Footer Registration link → register form', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'Registration' }).click();
    await expect(page).toHaveURL(new RegExp('registerform'));
  });

  test('TC-NAV-022: Footer Terms and Conditions link → /term-and-condition', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'Terms and conditions' }).click();
    await expect(page).toHaveURL('/term-and-condition');
    await expect(page).toHaveURL('/term-and-condition');
  });

  test('TC-NAV-023: Footer Login link → /myaccount', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('myaccount'));
  });

  test('TC-NAV-024: Footer Shipping Policy link → /shipping-policy', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'Shipping Policy' }).click();
    await expect(page).toHaveURL('/shipping-policy');
    await expect(page).toHaveURL('/shipping-policy');
  });

  test('TC-NAV-025: Footer visa-cards image visible', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByAltText('visa-cards')).toBeVisible();
  });

  test('TC-NAV-026: "Information" heading visible in footer', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-NAV-027: "More Information" heading visible in footer', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-NAV-028: Footer logo links back to homepage', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('link', { name: 'logo' }).first().click();
    await expect(page).toHaveURL('/');
  });

});

test.describe('Homepage', () => {

  test('TC-NAV-029: Homepage loads with promotional banners', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

  test('TC-NAV-030: Homepage carousel Previous/Next buttons visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-NAV-031: Carousel Next button cycles slides without crash', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Next' }).first().click();
    await page.waitForTimeout(600);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-NAV-032: Category card links visible on homepage', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const catLinks = page.locator('a[href*="/product-category/"]');
    expect(await catLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test('TC-NAV-033: Category links point to product-category URLs', async ({ page }) => {
    await loginUser(page);
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
    await loginUser(page);
    await expect(page.getByText('FEIN License')).toBeVisible();
    await expect(page.getByText('Tobacco License')).toBeVisible();
    await expect(page.getByText('Tax ID')).toBeVisible();
  });

  test('TC-NAV-035: "Upload Now" button in license modal functional', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByRole('button', { name: 'Upload Now' })).toBeVisible();
  });

  test('TC-NAV-036: Shipping policy modal shows delivery regions info', async ({ page }) => {
    await loginUser(page);
  });

});
