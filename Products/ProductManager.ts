import { Page } from '@playwright/test';
import { CategoryPage } from './CategoryPage';
import { ProductDetailPage } from './ProductDetailPage';

export class ProductManager {
    page: Page;
    Category: CategoryPage;
    ProductDetail: ProductDetailPage;

    constructor(page: Page) {
        this.page          = page;
        this.Category      = new CategoryPage(page);
        this.ProductDetail = new ProductDetailPage(page);
    }

    getCategoryPage(): CategoryPage           { return this.Category; }
    getProductDetailPage(): ProductDetailPage { return this.ProductDetail; }
}
