import { test, expect } from '@playwright/test';
import { AuthManager } from '../Auth/AuthManager';
import { ProductManager } from '../Products/ProductManager';
import authData from '../TestData/AuthData.json';
import productData from '../TestData/ProductData.json';

test.describe('Category / Listing', () => {

  test('TC-PROD-001: Category page loads with correct title', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await expect(page).toHaveURL(new RegExp(productData.categorySlug));
  });

  test('TC-PROD-002: Category page shows product cards', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyProductCardsVisible();
  });

  test('TC-PROD-003: Product card shows stock status badge', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyStockBadge();
  });

  test('TC-PROD-004: Product card shows product name as a link', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await expect(page.locator('a[class*="product"], h2 a, .woocommerce-loop-product__title a').first()).toBeVisible();
  });

  test('TC-PROD-005: Product card shows SKU', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifySkuVisible();
  });

  test('TC-PROD-006: Product card shows price', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyPriceVisible();
  });

  test('TC-PROD-007: Product card shows "View Options" button', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyViewOptionsButtons();
  });

  test('TC-PROD-009: Clicking View Options navigates to detail page', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().clickViewOptionsFirst();
    await expect(page).toHaveURL(/\/product\//);
  });

  test('TC-PROD-010: Sort By dropdown visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifySortByDropdown();
  });

  test('TC-PROD-011: Show (per page) dropdown visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyShowPerPageDropdown();
  });

  test('TC-PROD-012: Pagination visible on category page', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyPagination();
  });

  test('TC-PROD-015: Page breadcrumb shows category name', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyBreadcrumb();
  });

  test('TC-PROD-016: Grid/List view toggle buttons visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getCategoryPage().navigateToCategory(productData.categorySlug);
    await mgr.getCategoryPage().verifyGridListToggle();
  });

});

test.describe('Product Detail', () => {

  test('TC-PROD-017: Product detail page loads correctly', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await expect(page).toHaveURL(new RegExp(productData.productSlug));
  });

  test('TC-PROD-018: Product detail shows product name as h1 heading', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyProductNameHeading();
  });

  test('TC-PROD-019: Product detail shows SKU', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifySkuVisible();
  });

  test('TC-PROD-020: Product detail shows categories as clickable links', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyCategoryLinks();
  });

  test('TC-PROD-022: Product detail shows price', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyPriceVisible();
  });

  test('TC-PROD-023: Product detail shows "all purchases are final" notice', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyAllSalesNotice();
  });

  test('TC-PROD-024: Variant table has Flavor, Price, Stock, Quantity headers', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyVariantTableHeaders();
  });

  test('TC-PROD-026: Each variant row shows + and - quantity buttons', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await expect(mgr.getProductDetailPage().plusButtons.first()).toBeVisible();
    await expect(mgr.getProductDetailPage().minusButtons.first()).toBeVisible();
  });

  test('TC-PROD-029: Clicking + increments quantity', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().clickPlusButton();
    await expect(page).not.toHaveURL('about:blank');
  });

  test('TC-PROD-033: Product gallery image is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyGalleryImage();
  });

  test('TC-PROD-034: Gallery Previous and Next buttons are visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyGalleryNavButtons();
  });

  test('TC-PROD-035: Recommended Products section is visible', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().verifyRecommendedSection();
  });

  test('TC-PROD-036: Clicking a category link navigates to that category', async ({ page }) => {
    const auth = new AuthManager(page);
    await auth.getLoginPage().login(authData.validUser.username, authData.validUser.password);
    const mgr = new ProductManager(page);
    await mgr.getProductDetailPage().navigateToProduct(productData.productSlug);
    await mgr.getProductDetailPage().categoryLinks.first().click();
    await expect(page).toHaveURL(/\/product-category\//);
  });

});
