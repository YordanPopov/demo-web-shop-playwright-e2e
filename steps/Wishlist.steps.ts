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

    
}
