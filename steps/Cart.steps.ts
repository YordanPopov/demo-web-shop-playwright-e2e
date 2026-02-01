import { Page, expect } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

export default class CartSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async openCart(): Promise<void> {
        await this.cartPage.navigate();
    }

    async verifyCartHasItems(): Promise<void> {
        const hasItems = await this.cartPage.hasItems();
        expect.soft(hasItems).toBeTruthy();
    }

    async verifyCartIsEmpty(): Promise<void> {
        const isEmpty = await this.cartPage.isCartEmpty();
        expect.soft(isEmpty).toBeTruthy();
    }

    async verifyProductInCart(productTitle: string): Promise<void> {
        const isInCart = await this.cartPage.isProductInCart(productTitle);
        expect.soft(isInCart).toBeTruthy();
    }

    async verifyCartItemsCount(expectedCount: number): Promise<void> {
        const actCount = await this.cartPage.getCartItemsCount();
        expect.soft(actCount).toBe(expectedCount);
    }

    async verifyCartBadgeCount(expectedCount: number): Promise<void> {
        const actCount = await this.cartPage.getCartBadgeCount();
        expect.soft(actCount).toBe(expectedCount);
    }

    async updateProductQuantity(productTitle: string, newQuantity: number): Promise<void> {
        await this.cartPage.updateProductQuantityByTitle(productTitle, newQuantity);
    }

    async verifyProductQuantity(productTitle: string, expectedQty: number): Promise<void> {
        const titles = await this.cartPage.getProductTitles();
        const productIndex = titles.findIndex((title) => title.includes(productTitle));

        if (productIndex === -1) {
            throw new Error(`Product with title '${productTitle}' not found in cart.`);
        }

        const actualQty = await this.cartPage.getProductQuantity(productIndex);
        expect.soft(actualQty).toBe(expectedQty);
    }

    async verifyProductSubtotal(productTitle: string, expectedSubtotal: number): Promise<void> {
        const titles = await this.cartPage.getProductTitles();
        const productIndex = titles.findIndex((title) => title.includes(productTitle));

        if (productIndex === -1) {
            throw new Error(`Product with title '${productTitle}' not found in cart.`);
        }

        const actualSubtotal = await this.cartPage.getProductSubtotal(productIndex);
        expect.soft(actualSubtotal).toBe(expectedSubtotal);
    }

    async verifyProductPrice(productTitle: string, expectedPrice: number): Promise<void> {
        const actualPrice = await this.cartPage.getProductPriceByTitle(productTitle);
        expect.soft(actualPrice).toBe(expectedPrice);
    }

    async verifySubtotal(expectedSubtotal: string): Promise<void> {
        const actualSubtotal = await this.cartPage.getSubtotal();
        expect.soft(actualSubtotal).toBe(expectedSubtotal);
    }

    async verifyTotal(expectedTotal: string): Promise<void> {
        const actualTotal = await this.cartPage.getTotal();
        expect.soft(actualTotal).toBe(expectedTotal);
    }

    async removeProduct(productTitle: string): Promise<void> {
        await this.cartPage.removeProductByTitle(productTitle);
    }

    async clearCart(): Promise<void> {
        const hasItems = await this.cartPage.hasItems();

        if (hasItems) {
            await this.cartPage.removeAllProducts();
        }
    }

    async proceedToCheckout(): Promise<void> {
        await this.cartPage.checkoutWithTerms();
    }

    async verifyCartSummary(expected: { subtotal: number; total: number }): Promise<void> {
        const summary = await this.cartPage.verifyCartSummary();
        expect.soft(summary.subtotal).toBe(expected.subtotal);
        expect.soft(summary.total).toBe(expected.total);
    }
}
