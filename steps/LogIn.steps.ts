import { expect, Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import type { LogInData, LoginValidationErrors } from '@types';

export default class LogInSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async loginUser(data: LogInData): Promise<void> {
        await this.logInPage.login(data);

        await this.logInPage.verifySuccessfulLogin();
    }

    async attemptLoginUser(data: LogInData, expectedErrors: LoginValidationErrors): Promise<void> {
        await this.logInPage.login(data);

        const actualErrors = await this.logInPage.getValidationErrors();

        for (const field in expectedErrors) {
            await expect(actualErrors[field]).toBe(expectedErrors[field]);
        }
    }
}
