import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class AuthManager {

  private loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }
}
