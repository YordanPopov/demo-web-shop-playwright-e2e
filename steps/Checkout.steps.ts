import { expect, Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

export default class CheckoutSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCheckout(): Promise<void> {
        await this.checkoutPage.navigate();
        await expect(this.page).toHaveTitle(this.checkoutPage.TITLE);
    }
}
