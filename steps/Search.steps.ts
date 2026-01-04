import { Page, expect } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

export default class SearchResultsSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async searchProduct(query: string): Promise<void> {
        await this.searchResultsPage.search(query);
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
        expect.soft(hasResult).toBeTruthy();

        const message = await this.searchResultsPage.getNoResultsMessage();
        expect.soft(message).toContain(expectedMessage);
    }
}
