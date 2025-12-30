import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
    protected URL: string;
    protected TITLE: string;

    constructor(protected page: Page) {}

    async navigate(): Promise<void> {
        await this.page.goto(this.URL);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible({ timeout: 3000 });
    }
}
