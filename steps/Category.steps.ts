import { expect, Page } from '@playwright/test';

/* Page object */
import PageFactory from '@pages/Page.factory';

/* Types */
import { CategorySlug, SortType, SortOrder, SortOptions } from '@types';

export default class CategorySteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCategory(category: CategorySlug): Promise<void> {
        await this.categoryPage.navigateToCategory(category);
    }

    async verifyProductsDisplayed(): Promise<void> {
        const hasProducts = await this.categoryPage.hasProducts();
        expect.soft(hasProducts).toBeTruthy();

        const count = await this.categoryPage.getProductsCount();
        expect.soft(count).toBeGreaterThan(0);
    }

    async sortProducts(option: SortOptions): Promise<void> {
        await this.categoryPage.sortBy(option);
    }

    async verifySorting(type: SortType, order: SortOrder): Promise<void> {
        if (type === 'name') {
            const isValid = await this.categoryPage.verifySortByName(order);
            expect.soft(isValid).toBeTruthy();
        } else {
            const isValid = await this.categoryPage.verifySortByPrice(order);
            expect.soft(isValid).toBeTruthy();
        }
    }
}
