import { Page, expect } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import {} from '@types';

export default class SearchResultsSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async searchProduct(query: string): Promise<void> {
        await this.homePage.searchProduct(query);
    }

    async advancedSearchProduct(options: {
        query: string;
        category?: string;
        manufacturer?: string;
        priceFrom?: number;
        priceTo?: number;
        searchInDescription?: boolean;
    }): Promise<void> {
        await this.searchResultsPage.navigate();

        await this.searchResultsPage.advancedSearch(options);
    }

    async verifySearchResults(): Promise<void> {
        const hasResults = await this.searchResultsPage.hasResult();
        expect.soft(hasResults).toBeTruthy();
    }

    async verifyResultsCount(expectedCount: number): Promise<void> {
        const count = await this.searchResultsPage.getResultsCount();
        expect.soft(count).toBeGreaterThanOrEqual(expectedCount);
    }

    async verifyNoResultsMessage(expectedMessage: string): Promise<void> {
        const hasResult = await this.searchResultsPage.hasResult();
        expect.soft(hasResult).toBeFalsy();

        const message = await this.searchResultsPage.getNoResultsMessage();
        expect.soft(message).toContain(expectedMessage);
    }

    async verifyProductsContainKeyword(keyword: string): Promise<void> {
        const containKeyword = await this.searchResultsPage.allProductsContainKeyword(keyword);
        expect(containKeyword).toBeTruthy();
    }
}
