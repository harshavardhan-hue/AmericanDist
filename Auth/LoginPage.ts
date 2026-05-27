import { Page, Locator } from '@playwright/test';

export class LoginPage {

  private page:                  Page;
  private usernameField:         Locator;
  private passwordField:         Locator;
  private loginButton:           Locator;
  private shippingPolicyHeading: Locator;
  private continueButton:        Locator;

  constructor(page: Page) {
    this.page                  = page;
    this.usernameField         = page.getByRole('textbox', { name: 'Username or email *' });
    this.passwordField         = page.locator('input[name="password"]');
    this.loginButton           = page.getByRole('button', { name: 'Login' });
    this.shippingPolicyHeading = page.getByRole('heading', { name: 'Shipping Policy Update : To' });
    this.continueButton        = page.getByRole('button', { name: 'Continue' });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto('/myaccount?tab=login');
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await this.shippingPolicyHeading.isVisible();
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameField.click();
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async dismissShippingModal(): Promise<void> {
    // License upload modal may appear first — dismiss it with "Later"
    try {
      const laterBtn = this.page.getByRole('button', { name: 'Later' });
      await laterBtn.waitFor({ state: 'visible', timeout: 5000 });
      await laterBtn.click();
    } catch { /* modal did not appear — continue */ }

    // Shipping policy modal — dismiss it with "Continue"
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.continueButton.click();
    } catch { /* modal did not appear — continue */ }
  }

  async waitForHomePage(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async captureScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: fileName, fullPage: true });
  }

  async login(username: string, password: string): Promise<void> {
    await this.navigateToLoginPage();
    await this.verifyLoginPageLoaded();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.dismissShippingModal();
    await this.waitForHomePage();
  }
}
