import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import authData from '../TestData/AuthData.json';

test.describe('Authentication', () => {

  test('TC-AUTH-001: Login with valid credentials and capture home page screenshot', async ({ page }) => {

    const auth = new AuthManager(page);

    // Step 1 & 2: Browser launches maximized and navigates to the login page
    await auth.getLoginPage().navigateToLoginPage();

    // Step 2: Verify login page is loaded (Shipping Policy heading visible)
    await expect(page.getByRole('heading', { name: 'Shipping Policy Update : To' })).toBeVisible();

    // Step 3: Enter Username
    await auth.getLoginPage().enterUsername(authData.validUser.username);

    // Step 4: Enter Password (masked)
    await auth.getLoginPage().enterPassword(authData.validUser.password);

    // Step 5: Click Login button
    await auth.getLoginPage().clickLoginButton();

    // Step 6: Dismiss shipping modal and wait for Home page to load
    await auth.getLoginPage().dismissShippingModal();
    await auth.getLoginPage().waitForHomePage();

    // Step 7: Capture full page screenshot of the Home page
    await auth.getLoginPage().captureScreenshot('home-page.png');

  });

});
