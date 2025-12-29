import { Page, expect } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import type { RegistrationData, RegisterValidationErrors } from '@types';

export default class SignUpSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async registerUser(data: RegistrationData): Promise<void> {
        await this.signUpPage.register(data);

        await this.signUpPage.verifyRegistration();
    }

    async attemptRegisterUser(
        invalidData: RegistrationData,
        expectedErrors: RegisterValidationErrors
    ): Promise<void> {
        await this.signUpPage.register(invalidData);

        const actualErrors = await this.signUpPage.getValidationErrors();

        for (const field in expectedErrors) {
            await expect(actualErrors[field]).toBe(expectedErrors[field]);
        }
    }
}
