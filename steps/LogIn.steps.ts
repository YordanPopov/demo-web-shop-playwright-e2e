import { Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import type { LogInData } from '@types';

export default class LogInSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async login(data: LogInData): Promise<void> {
        await this.logInPage.login(data);

        await this.logInPage.verifySuccessfulLogin();
    }
}
