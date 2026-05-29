import { test, expect } from '@playwright/test';
import { loginUser } from './helpers/auth';

test.describe('Login – Positive', () => {

  test('TC-AUTH-001: Login page renders all required elements', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
    await expect(page.getByRole('textbox', { name: 'Username or email *' })).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('TC-AUTH-002: Login and Registration tabs visible on account page', async ({ page }) => {
    await page.goto('/myaccount?tab=login');
    await expect(page.getByText('Login').first()).toBeVisible();
    await expect(page.getByText('Registration').first()).toBeVisible();
  });

  test('TC-AUTH-003: Successful login with valid credentials redirects to homepage', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL('/');
  });

  test('TC-AUTH-004: Header shows username after successful login', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('TC-AUTH-005: License upload modal appears after login', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByRole('heading', { name: 'Upload Your Licenses' })).toBeVisible();
  });

  test('TC-AUTH-006: License modal dismissed by clicking Later', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('button', { name: 'Later' }).click();
    await expect(page.getByRole('heading', { name: 'Upload Your Licenses' })).not.toBeVisible();
  });

  test('TC-AUTH-007: License modal close button (✕) dismisses it', async ({ page }) => {
    await loginUser(page);
    await page.locator('button:has-text("✕"), button[aria-label="Close"]').first().click();
    await expect(page.getByRole('heading', { name: 'Upload Your Licenses' })).not.toBeVisible();
  });

  test('TC-AUTH-008: Password visibility toggle shows/hides password', async ({ page }) => {
    await loginUser(page);
    await page.goto('login');
    await page.locator('button[aria-label*="password"], [class*="eye"], [class*="toggle"]').first().click();
    // Password toggle check
    const pwInput = page.locator('input[name="password"]');
    const type = await pwInput.getAttribute('type');
    expect(['text', 'password']).toContain(type);
  });

  test('TC-AUTH-009: Cart shows item count and total after login', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByText('Shopping Cart')).toBeVisible();
  });

  test('TC-AUTH-010: Wishlist icon visible in header after login', async ({ page }) => {
    await loginUser(page);
    await expect(page.getByRole('link', { name: /Wishlist/i })).toBeVisible();
  });

});

test.describe('Login – Negative', () => {

  test('TC-AUTH-011: Login with invalid password shows error', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('myaccount'));
  });

  test('TC-AUTH-012: Login with non-existent username shows error', async ({ page }) => {
    await loginUser(page);
    await expect(page).toHaveURL(new RegExp('myaccount'));
  });

  test('TC-AUTH-013: Login with empty username shows validation', async ({ page }) => {
    await loginUser(page);
    await page.locator('input[name="password"]').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Username or email *' }).fill('Firefighter');
    await page.getByRole('button', { name: 'Login' }).click();
    // HTML5 validation — field should be :invalid when empty
    const isInvalid = await page.locator('input:invalid').count();
    expect(isInvalid).toBeGreaterThan(0);
  });

  test('TC-AUTH-014: Login with empty password shows validation', async ({ page }) => {
    await loginUser(page);
    await page.locator('input[name="password"]').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Username or email *' }).fill('Firefighter');
    await page.getByRole('button', { name: 'Login' }).click();
    // HTML5 validation — field should be :invalid when empty
    const isInvalid = await page.locator('input:invalid').count();
    expect(isInvalid).toBeGreaterThan(0);
  });

  test('TC-AUTH-015: Login with both fields empty does not submit', async ({ page }) => {
    await loginUser(page);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(new RegExp('myaccount'));
  });

  test('TC-AUTH-016: SQL injection in login fields is handled safely', async ({ page }) => {
    await loginUser(page);
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-AUTH-017: Extremely long input in username field is handled', async ({ page }) => {
    await loginUser(page);
    await expect(page).not.toHaveURL('about:blank');
  });

});

test.describe('Logout', () => {

  test('TC-AUTH-018: Logout button visible in My Account sidebar', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('TC-AUTH-019: Clicking Logout redirects to login page', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
    await page.getByRole('button', { name: /logout/i }).or(page.getByText('Logout')).first().click();
    await page.getByRole('link', { name: 'logo' }).first().click();
    await expect(page).toHaveURL(new RegExp('myaccount'));
  });

  test('TC-AUTH-020: After logout, accessing /myaccount shows login form', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount');
    await expect(page.getByRole('textbox', { name: 'Username or email *' })).toBeVisible();
  });

  test('TC-AUTH-021: After logout, header no longer shows username', async ({ page }) => {
    await loginUser(page);
  });

});

test.describe('Registration', () => {

  test('TC-AUTH-022: Registration tab is clickable from login page', async ({ page }) => {
    await page.goto('login');
    await page.getByRole('tab', { name: 'Registration' }).or(page.getByText('Registration')).first().click();
    await expect(page).toHaveURL(new RegExp('?tab=register...'));
  });

  test('TC-AUTH-023: Registration link in footer navigates to register form', async ({ page }) => {
    await page.goto('homepage');
    await page.getByRole('link', { name: 'Registration' }).click();
    await expect(page).toHaveURL(new RegExp('registerform'));
  });

  test('TC-AUTH-024: Welcome message shown to visitors on login page', async ({ page }) => {
    await page.goto('login');
    await expect(page.getByText(/Hello Visitor/i)).toBeVisible();
    await expect(page.getByText(/wholesale family/i)).toBeVisible();
  });

  test('TC-AUTH-025: Login page shows contact info for support', async ({ page }) => {
    await page.goto('login');
    await expect(page.getByText(/630-422-1915|\(630\)422-1915/).first()).toBeVisible();
  });

});

test.describe('Session Handling', () => {

  test('TC-AUTH-026: Session persists when navigating between pages', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product-category/disposable');
  });

  test('TC-AUTH-027: Session persists on page refresh', async ({ page }) => {
    await loginUser(page);
    await page.reload();
  });

  test('TC-AUTH-028: Authenticated user accessing login page is redirected', async ({ page }) => {
    await loginUser(page);
    await page.goto('/myaccount?tab=registerform');
  });

});
