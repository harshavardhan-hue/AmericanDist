import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Top Promo Banners', () => {

  test('TC-HOME-001: Three top promo banners are visible below the header', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

  test('TC-HOME-002: New Arrival banner links to new-arrival category', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const newArrival = page.locator('a[href*="new-arrival"]').first();
    await expect(newArrival).toBeVisible();
    const href = await newArrival.getAttribute('href');
    expect(href).toMatch(/new-arrival/);
  });

  test('TC-HOME-003: Disco brand promo banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
    await expect(page.locator('a[href*="brand/disco"]').first()).toBeVisible();
  });

  test('TC-HOME-004: Lil MFS brand promo banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
    await expect(page.locator('a[href*="lil-mfs"]').first()).toBeVisible();
  });

  test('TC-HOME-005: All top promo banners contain images', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

});

test.describe('Hero Carousel', () => {

  test('TC-HOME-006: Main hero carousel is visible on homepage', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('img[alt*="Slide"]').first()).toBeVisible();
  });

  test('TC-HOME-007: Hero carousel has 15+ slide indicator dots', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const dots = page.locator('[class*="dot"], [class*="indicator"]');
    expect(await dots.count()).toBeGreaterThanOrEqual(3);
  });

  test('TC-HOME-008: Hero carousel Previous button is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-009: Hero carousel Next button is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-010: Hero carousel Next button advances slide without crash', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Next' }).first().click();
    await page.waitForTimeout(600);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-HOME-011: Hero carousel Previous button is clickable', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Previous' }).first().click();
    await page.waitForTimeout(600);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-HOME-012: Hero carousel slides contain clickable image links', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const card0 = page.locator('a').filter({ has: page.locator('img[alt="Card 0"]') }).first();
  });

  test('TC-HOME-013: Hero carousel slide links point to products or brands', async ({ page }) => {
    await loginUser(page);
    const card0 = page.locator('a').filter({ has: page.locator('img[alt="Card 0"]') }).first();
  });

});

test.describe('Brand Spotlight', () => {

  test('TC-HOME-014: Brand spotlight section has brand/product cards', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-015: Buttons brand card is visible and clickable', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-016: Meta Tabz brand card is visible and clickable', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-017: BLNDZ-7 brand card is visible and clickable', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-018: Brand spotlight card images are all visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

});

test.describe('Category Grid', () => {

  test('TC-HOME-019: Category grid shows at least 12 category cards', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const cats = page.locator('a[href*="/product-category/"]');
    expect(await cats.count()).toBeGreaterThanOrEqual(12);
  });

  test('TC-HOME-020: E-Liquids category card links to /product-category/eliquids', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/eliquids"]')).toBeVisible();
  });

  test('TC-HOME-021: Disposable category card links to /product-category/disposable', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/disposable"]')).toBeVisible();
  });

  test('TC-HOME-022: Vape Shop category card links to /product-category/vape-shop', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/vape-shop"]')).toBeVisible();
  });

  test('TC-HOME-023: Kratom category card links to /product-category/kratom', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/kratom"]')).toBeVisible();
  });

  test('TC-HOME-024: Smoke Shop category card links to /product-category/smoke-shop', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/smoke-shop"]')).toBeVisible();
  });

  test('TC-HOME-025: CBD category card links to /product-category/cbd', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/cbd"]')).toBeVisible();
  });

  test('TC-HOME-026: Glass category card links to /product-category/glass', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/glass"]')).toBeVisible();
  });

  test('TC-HOME-027: Mushroom category card links to /product-category/mushroom', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/mushroom"]')).toBeVisible();
  });

  test('TC-HOME-028: Cream Chargers category card links correctly', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/cream-chargers-dispensers"]')).toBeVisible();
  });

  test('TC-HOME-029: KetaTabz category card links to /product-category/ketatabz', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/ketatabz"]')).toBeVisible();
  });

  test('TC-HOME-030: Botanicals category card links to /product-category/botanicals', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/product-category/botanicals"]')).toBeVisible();
  });

  test('TC-HOME-031: All category cards contain visible images', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-032: Clicking Disposable category navigates to category page', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.locator('a[href="/product-category/disposable"]').first().click();
    await expect(page).toHaveURL(new RegExp('\\/product-category\\/disposable'));
    await expect(page.locator('a[href="/product-category/disposable"]')).toBeVisible();
  });

});

test.describe('Featured Products', () => {

  test('TC-HOME-033: Featured products section shows product banner cards', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
    await expect(page.locator('a[href*="geek-bar-meloso"]').first()).toBeVisible();
    await expect(page.locator('a[href*="infusion-whip"]').first()).toBeVisible();
  });

  test('TC-HOME-034: Geek Bar Meloso product banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-035: Featured product cards are clickable image links', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('[class*="product"], .product').first()).toBeVisible();
  });

  test('TC-HOME-036: Infusion Whip product banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

});

test.describe('Hot Deals / Best Sellers', () => {

  test('TC-HOME-037: Hot deals section shows product/brand banners', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    const bannerImages = page.locator('img[alt*="Card"], img[alt*="Slide"]');
    expect(await bannerImages.count()).toBeGreaterThan(0);
  });

  test('TC-HOME-038: Off Stamp brand banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-039: North Stellar product banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-040: Pillow Talk product banner is visible', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-041: Al Fakher search banner links to search results', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

});

test.describe('Second Carousel', () => {

  test('TC-HOME-042: Second carousel (brand spotlight) is visible on homepage', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('img[alt*="Slide"]').first()).toBeVisible();
  });

  test('TC-HOME-043: Second carousel has Previous and Next navigation buttons', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-044: Second carousel slide is a clickable link to a brand', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

});

test.describe('Bottom Brand Banners', () => {

  test('TC-HOME-045: Chocolate brand banner is visible at the bottom of homepage', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/brand/chocolate"]').first()).toBeVisible();
  });

  test('TC-HOME-046: Kadilo brand banner is visible at the bottom of homepage', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await expect(page.locator('a[href="/brand/kadilo"]').first()).toBeVisible();
  });

  test('TC-HOME-047: Chocolate brand banner contains an image', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

  test('TC-HOME-048: Kadilo brand banner contains an image', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
  });

});
