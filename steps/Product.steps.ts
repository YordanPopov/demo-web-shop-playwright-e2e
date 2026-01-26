import { expect, Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

export default class ProductSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToProduct(productSlug: string): Promise<void> {
        await this.productPage.navigateToProduct(productSlug);
    }

    async verifyProductName(expectedName: string): Promise<void> {
        const actualName = await this.productPage.getProductName();
        expect(actualName).toBe(expectedName);
    }

    async verifyProductCurrentPrice(expectedPrice: number): Promise<void> {
        const actualPrice = await this.productPage.getProductCurrentPrice();
        expect(actualPrice).toBe(expectedPrice);
    }

    async verifyProductOldPRice(expectedPrice: number): Promise<void> {
        const actualPrice = await this.productPage.getProductOldPrice();
        expect(actualPrice).toBe(expectedPrice);
    }

    async verifyInStock(): Promise<void> {
        const isInStock = await this.productPage.isInStock();
        expect(isInStock).toBeTruthy();
    }

    async addProductToCart(): Promise<void> {
        await this.productPage.addToCart();
    }

    async addProductToWishlist(): Promise<void> {
        await this.productPage.addToWishlist();
    }
}
