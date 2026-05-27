import { defineConfig } from '@playwright/test';
import { off } from 'process';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,

  reporter: [
    // Terminal output while running
    ['list'],

    // Playwright's built-in HTML report
    ['html', { outputFolder: 'playwright-report', open: 'never' }],

    // Allure report
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      environmentInfo: {
        App_URL:     'http://93.127.217.17:3002',
        Environment: 'Staging',
        Browser:     'Chromium',
        Platform:    process.platform,
        Node_Version: process.version,
      },
    }],
  ],

  use: {
    baseURL:           'http://93.127.217.17:3002',
    trace:             'on-first-retry',   // view trace on retry
    screenshot:        'only-on-failure',  // attach screenshot on fail
    video:             'retain-on-failure', // attach video on fail
    headless: false,
    ignoreHTTPSErrors: true,
    permissions:['geolocation'],
    actionTimeout:     15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        channel:  'chrome',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
