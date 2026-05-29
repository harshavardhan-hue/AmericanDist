import { Page, Locator, expect } from '@playwright/test';

export class OrdersPage {
    page: Page;
    orderColumnHeader: Locator;
    dateColumnHeader: Locator;
    statusColumnHeader: Locator;
    totalColumnHeader: Locator;
    recentOrdersBtn: Locator;
    olderOrdersBtn: Locator;
    viewFirstOrderLink: Locator;
    orderDetailOrderNumber: Locator;
    orderDetailStatus: Locator;
    orderDetailDate: Locator;
    orderDetailTotal: Locator;
    ordersTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderColumnHeader      = page.getByText('Order Number').or(page.getByText('ORDER')).first();
        this.dateColumnHeader       = page.getByText('Date').or(page.getByText('DATE')).first();
        this.statusColumnHeader     = page.getByText('Status').or(page.getByText('STATUS')).first();
        this.totalColumnHeader      = page.getByText('Total').or(page.getByText('TOTAL')).first();
        this.recentOrdersBtn        = page.getByText('Recent Orders');
        this.olderOrdersBtn         = page.getByText('Older Orders');
        this.viewFirstOrderLink     = page.getByRole('link', { name: /View Details|View/i }).first();
        this.orderDetailOrderNumber = page.getByText('Order Number');
        this.orderDetailStatus      = page.getByText('Status');
        this.orderDetailDate        = page.getByText('Date');
        this.orderDetailTotal       = page.getByText('Total');
        this.ordersTable            = page.locator('table.table-responsive, table, [class*="order"]').first();
    }

    async navigateToOrders(): Promise<void> {
        await this.page.goto('/myaccount?tab=Orders');
    }

    async verifyOrderTableColumns(): Promise<void> {
        await expect(this.orderColumnHeader).toBeVisible();
        await expect(this.dateColumnHeader).toBeVisible();
        await expect(this.statusColumnHeader).toBeVisible();
        await expect(this.totalColumnHeader).toBeVisible();
    }

    async verifyOrderToggleButtons(): Promise<void> {
        await expect(this.recentOrdersBtn).toBeVisible();
        await expect(this.olderOrdersBtn).toBeVisible();
    }

    async clickViewFirstOrder(): Promise<void> {
        await this.viewFirstOrderLink.click();
    }

    async verifyOrderDetailLabels(): Promise<void> {
        await expect(this.orderDetailOrderNumber).toBeVisible();
        await expect(this.orderDetailStatus).toBeVisible();
        await expect(this.orderDetailDate).toBeVisible();
        await expect(this.orderDetailTotal).toBeVisible();
    }

    async clickOlderOrders(): Promise<void> {
        await this.olderOrdersBtn.click();
    }

    async clickRecentOrders(): Promise<void> {
        await this.recentOrdersBtn.click();
    }
}
