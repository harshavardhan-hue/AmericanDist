import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    page: Page;
    shoppingCartLabel: Locator;
    cartStepIndicator: Locator;
    informationStep: Locator;
    shippingStep: Locator;
    paymentStep: Locator;
    cartProductRows: Locator;
    cartProductImages: Locator;
    removeItemButtons: Locator;
    quantityMinusButtons: Locator;
    quantityPlusButtons: Locator;
    cartTotalsHeading: Locator;
    subtotalRow: Locator;
    taxRow: Locator;
    flatRateOption: Locator;
    pickupOption: Locator;
    allSalesNotice: Locator;
    proceedToCheckoutButton: Locator;
    couponField: Locator;
    applyCouponButton: Locator;
    updateCartButton: Locator;
    emptyCartButton: Locator;
    shippingPolicyHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLabel       = page.getByText('Shopping Cart');
        this.cartStepIndicator       = page.getByText(/CART/i).first();
        this.informationStep         = page.getByText(/INFORMATION/i).first();
        this.shippingStep            = page.getByText(/SHIPPING/i).first();
        this.paymentStep             = page.getByText(/PAYMENT/i).first();
        this.cartProductRows         = page.locator('.cart-product-image').first();
        this.cartProductImages       = page.locator('.cart-product-image img, [class*="cart-product-image"] img');
        this.removeItemButtons       = page.locator('.cart-page-image-close-bg');
        this.quantityMinusButtons    = page.locator('.symbol-left, [class*="symbol-left"]');
        this.quantityPlusButtons     = page.locator('.symbol-right, [class*="symbol-right"]');
        this.cartTotalsHeading       = page.getByText(/CART TOTALS/i).first();
        this.subtotalRow             = page.getByText(/Subtotal/i).first();
        this.taxRow                  = page.getByText(/Tax/i).first();
        this.flatRateOption          = page.getByText(/Flat rate/i).first();
        this.pickupOption            = page.getByText(/PICKUP/i).first();
        this.allSalesNotice          = page.getByText(/All Sales Are Final/i).first();
        this.proceedToCheckoutButton = page.getByRole('button', { name: /Proceed to Checkout/i }).or(page.getByRole('link', { name: /Proceed to Checkout/i })).first();
        this.couponField             = page.locator('input[placeholder*="coupon" i], input[name="coupon_code"]').first();
        this.applyCouponButton       = page.locator('[class*="applyBtn"], button').filter({ hasText: /Apply Coupon|Apply/i }).first();
        this.updateCartButton        = page.locator('[class*="updateBtn"], button').filter({ hasText: /Update/i }).first();
        this.emptyCartButton         = page.locator('[class*="emptyBtn"], button').filter({ hasText: /Empty Cart/i }).first();
        this.shippingPolicyHeading   = page.getByRole('heading', { name: /Shipping Policy Update/i });
    }

    async navigateToCart(): Promise<void> {
        await this.page.goto('/cart');
    }

    async verifyCartUrl(): Promise<void> {
        await expect(this.page).toHaveURL('/cart');
    }

    async verifyShoppingCartLabel(): Promise<void> {
        await expect(this.shoppingCartLabel).toBeVisible();
    }

    async verifyCheckoutProgressStepper(): Promise<void> {
        await expect(this.cartStepIndicator).toBeVisible();
        await expect(this.informationStep).toBeVisible();
        await expect(this.shippingStep).toBeVisible();
        await expect(this.paymentStep).toBeVisible();
    }

    async verifyCartProductImages(): Promise<void> {
        const count = await this.cartProductImages.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyQuantityButtons(): Promise<void> {
        await expect(this.quantityPlusButtons.first()).toBeVisible();
        await expect(this.quantityMinusButtons.first()).toBeVisible();
    }

    async verifyCartTotalsHeading(): Promise<void> {
        await expect(this.cartTotalsHeading).toBeVisible();
    }

    async verifySubtotalRow(): Promise<void> {
        await expect(this.subtotalRow).toBeVisible();
    }

    async verifyTaxRow(): Promise<void> {
        await expect(this.taxRow).toBeVisible();
    }

    async verifyFlatRateOption(): Promise<void> {
        await expect(this.flatRateOption).toBeVisible();
    }

    async verifyPickupOption(): Promise<void> {
        await expect(this.pickupOption).toBeVisible();
    }

    async verifyAllSalesNotice(): Promise<void> {
        await expect(this.allSalesNotice).toBeVisible();
    }

    async verifyProceedToCheckoutButton(): Promise<void> {
        await expect(this.proceedToCheckoutButton).toBeVisible();
    }

    async verifyCouponField(): Promise<void> {
        await expect(this.couponField).toBeVisible();
    }

    async verifyUpdateCartButton(): Promise<void> {
        await expect(this.updateCartButton).toBeVisible();
    }

    async verifyEmptyCartButton(): Promise<void> {
        await expect(this.emptyCartButton).toBeVisible();
    }

    async verifyShippingPolicyBanner(): Promise<void> {
        await expect(this.shippingPolicyHeading).toBeVisible();
    }

    async clickProceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
    }

    async enterCouponCode(code: string): Promise<void> {
        await this.couponField.fill(code);
    }

    async clickApplyCoupon(): Promise<void> {
        await this.applyCouponButton.click();
    }

    async clickUpdateCart(): Promise<void> {
        await this.updateCartButton.click();
    }

    async clickEmptyCart(): Promise<void> {
        await this.emptyCartButton.click();
    }

    async clickPlusQuantity(): Promise<void> {
        await this.quantityPlusButtons.first().click();
    }

    async clickMinusQuantity(): Promise<void> {
        await this.quantityMinusButtons.first().click();
    }

    async selectPickupShipping(): Promise<void> {
        await this.pickupOption.click();
    }
}
