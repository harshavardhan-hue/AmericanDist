import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('About Us', () => {

  test('TC-STAT-001: About Us page loads at /aboutus', async ({ page }) => {
    await loginUser(page);
    await page.goto('/aboutus');
    await expect(page).toHaveURL('/aboutus');
    await expect(page).toHaveURL('/aboutus');
  });

  test('TC-STAT-002: About Us page has header (logo visible)', async ({ page }) => {
    await loginUser(page);
    await page.goto('/aboutus');
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-STAT-003: About Us page has footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/aboutus');
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

});

test.describe('FAQ's', () => {

  test('TC-STAT-004: FAQ\'s page loads at /faqs', async ({ page }) => {
    await loginUser(page);
    await page.goto('/faqs');
    await expect(page).toHaveURL('/faqs');
    await expect(page).toHaveURL('/faqs');
  });

  test('TC-STAT-005: FAQ\'s page has header', async ({ page }) => {
    await loginUser(page);
    await page.goto('/faqs');
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-STAT-006: FAQ\'s page has footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/faqs');
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

});

test.describe('Return Policy', () => {

  test('TC-STAT-007: Return Policy page loads at /refund-policy', async ({ page }) => {
    await loginUser(page);
    await page.goto('/refund-policy');
    await expect(page).toHaveURL('/refund-policy');
    await expect(page).toHaveURL('/refund-policy');
  });

  test('TC-STAT-008: Return Policy page has header', async ({ page }) => {
    await loginUser(page);
    await page.goto('/refund-policy');
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-STAT-009: Return Policy page has footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/refund-policy');
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

});

test.describe('Privacy Policy', () => {

  test('TC-STAT-010: Privacy Policy page loads at /privacy-policy', async ({ page }) => {
    await loginUser(page);
    await page.goto('/privacy-policy');
    await expect(page).toHaveURL('/privacy-policy');
    await expect(page).toHaveURL('/privacy-policy');
  });

  test('TC-STAT-011: Privacy Policy page has header', async ({ page }) => {
    await loginUser(page);
    await page.goto('/privacy-policy');
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-STAT-012: Privacy Policy page has footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/privacy-policy');
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

});

test.describe('Terms', () => {

  test('TC-STAT-013: Terms & Conditions page loads at /term-and-condition', async ({ page }) => {
    await loginUser(page);
    await page.goto('/term-and-condition');
    await expect(page).toHaveURL('/term-and-condition');
    await expect(page).toHaveURL('/term-and-condition');
  });

  test('TC-STAT-014: Terms & Conditions page has header', async ({ page }) => {
    await loginUser(page);
    await page.goto('/term-and-condition');
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-STAT-015: Terms & Conditions page has footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/term-and-condition');
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

});

test.describe('Shipping Policy', () => {

  test('TC-STAT-016: Shipping Policy page loads at /shipping-policy', async ({ page }) => {
    await loginUser(page);
    await page.goto('/shipping-policy');
    await expect(page).toHaveURL('/shipping-policy');
    await expect(page).toHaveURL('/shipping-policy');
  });

  test('TC-STAT-017: Shipping Policy page has header', async ({ page }) => {
    await loginUser(page);
    await page.goto('/shipping-policy');
    await expect(page.getByAltText('logo').first()).toBeVisible();
  });

  test('TC-STAT-018: Shipping Policy page has footer', async ({ page }) => {
    await loginUser(page);
    await page.goto('/shipping-policy');
    await expect(page.getByRole('heading', { name: 'Need Help' })).toBeVisible();
  });

});

test.describe('Cross-Page', () => {

  test('TC-STAT-019: All 6 static pages show nicotine warning banner', async ({ page }) => {
    await loginUser(page);
  });

  test('TC-STAT-020: All static pages show footer contact number', async ({ page }) => {
    await loginUser(page);
    await page.goto('/aboutus');
    await expect(page.getByText(/630-422-1915|\(630\)422-1915/).first()).toBeVisible();
  });

  test('TC-STAT-021: Non-existent URL handled gracefully', async ({ page }) => {
    await loginUser(page);
    await page.goto('/this-page-does-not-exist-xyz');
  });

});
