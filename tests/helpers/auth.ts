import { Page } from '@playwright/test';

export async function loginUser(page: Page): Promise<void> {
  await page.goto('/myaccount?tab=login');
  await page.getByRole('textbox', { name: 'Username or email *' }).fill('Firefighter');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  // Dismiss license upload modal if present
  try {
    await page.getByRole('button', { name: 'Later' }).click({ timeout: 4000 });
  } catch { /* not shown */ }
  // Dismiss shipping policy modal if present
  try {
    await page.getByRole('button', { name: 'Continue' }).click({ timeout: 4000 });
  } catch { /* not shown */ }
}
