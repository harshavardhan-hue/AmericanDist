import { Page } from '@playwright/test';
import { DashboardPage } from './DashboardPage';
import { OrdersPage } from './OrdersPage';
import { AddressPage } from './AddressPage';
import { LicensesPage } from './LicensesPage';
import { ChangePasswordPage } from './ChangePasswordPage';
import { ShippingConsentPage } from './ShippingConsentPage';

export class AccountManager {
    page: Page;
    Dashboard: DashboardPage;
    Orders: OrdersPage;
    Address: AddressPage;
    Licenses: LicensesPage;
    ChangePassword: ChangePasswordPage;
    ShippingConsent: ShippingConsentPage;

    constructor(page: Page) {
        this.page            = page;
        this.Dashboard       = new DashboardPage(page);
        this.Orders          = new OrdersPage(page);
        this.Address         = new AddressPage(page);
        this.Licenses        = new LicensesPage(page);
        this.ChangePassword  = new ChangePasswordPage(page);
        this.ShippingConsent = new ShippingConsentPage(page);
    }

    getDashboard(): DashboardPage          { return this.Dashboard; }
    getOrders(): OrdersPage                { return this.Orders; }
    getAddress(): AddressPage              { return this.Address; }
    getLicenses(): LicensesPage            { return this.Licenses; }
    getChangePassword(): ChangePasswordPage { return this.ChangePassword; }
    getShippingConsent(): ShippingConsentPage { return this.ShippingConsent; }
}
