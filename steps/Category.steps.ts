import { expect, Page } from '@playwright/test';

/* Page object */
import PageFactory from '@pages/Page.factory';

/* Types */
import { Category } from '@types';

export default class CategorySteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCategory(category: Category): Promise<void> {
        await this.categoryPage.navigateToCategory(category);
    }

    async verifyProductsDisplayed(): Promise<void> {
        const hasProducts = await this.categoryPage.hasProducts();
        expect(hasProducts).toBeTruthy();

        const count = await this.categoryPage.getProductsCount();
        expect(count).toBeGreaterThan(0);
    }
}
