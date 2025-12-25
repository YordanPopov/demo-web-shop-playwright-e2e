import { Page, Locator, expect } from '@playwright/test';

export default abstract class BasePage {
    protected URL: string;
    protected TITLE: string;

    constructor(protected page: Page) {}

    protected async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    protected async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    protected async isElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible({ timeout: 3000 });
    }

    protected async verifyPageTitle(title: string): Promise<void> {
        await expect.soft(this.page).toHaveTitle(title);
    }
}
