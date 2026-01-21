import { Page, Expect, expect } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

export default class WishlistSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToWishlist(): Promise<void> {
        await this.wishlistPage.navigate();
    }

    async verifyWishlistHasItems(): Promise<void> {
        const hasItems = await this.wishlistPage.hasItems();
        expect(hasItems).toBeTruthy();
    }

    async verifyWishlistIsEmpty(): Promise<void> {
        const isEmpty = await this.wishlistPage.isEmpty();
        expect(isEmpty).toBeTruthy();
    }

    async verifyItemsCount(expectedCount: number): Promise<void> {
        const actualCount = await this.wishlistPage.getItemsCount();
        expect(actualCount).toBe(expectedCount);
    }

    async verifyProductInWishlist(productTitle: string): Promise<void> {
        const isInWishlist = await this.wishlistPage.isProductInWishlist(productTitle);
        expect(isInWishlist).toBeTruthy();
    }

    async verifyProductNotInWishlist(productTitle: string): Promise<void> {
        const isInWishlist = await this.wishlistPage.isProductInWishlist(productTitle);
        expect(isInWishlist).toBeFalsy();
    }

    async removeProductFromWishlist(productTitle: string): Promise<void> {
        await this.wishlistPage.removeProductByTitle(productTitle);
    }

    async removeProductByIndex(index: number): Promise<void> {
        await this.wishlistPage.removeProduct(index);
    }

    async clearWishlist(): Promise<void> {
        await this.wishlistPage.removeAllProducts();
    }

    async updateProductQuantity(productTitle: string, qty: number): Promise<void> {
        await this.wishlistPage.updateQuantityByTitle(productTitle, qty);
    }

    async verifyProductQuantity(productIndex: number, expectedQty: number): Promise<void> {
        const actualQty = await this.wishlistPage.getProductQuantity(productIndex);
        expect(actualQty).toBe(expectedQty);
    }

    async addProductToCart(productIndex: number): Promise<void> {
        await this.wishlistPage.addProductToCart(productIndex);
    }

    async addAllProductToCart(): Promise<void> {
        await this.wishlistPage.addAllToCart();
    }

    async verifyProductPrice(productIndex: number, expectedPrice: number): Promise<void> {
        const actualPrice = await this.wishlistPage.getProductPrice(productIndex);
        expect(actualPrice).toBe(expectedPrice);
    }

    async verifySubtotal(productIndex: number, expectedSubtotal: number): Promise<void> {
        const actualSubtotal = await this.wishlistPage.getProductSubtotal(productIndex);
        await expect(actualSubtotal).toBe(expectedSubtotal);
    }
}
