import { Page, expect } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import type { RegistrationData } from '@test-data/users.data';
import type { ValidationErrors } from '@test-data/users.data';

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
        expectedErrors: ValidationErrors
    ): Promise<void> {
        await this.signUpPage.register(invalidData);

        const actualErrors = await this.signUpPage.getValidationErrors();

        for (const field in expectedErrors) {
            await expect(actualErrors[field]).toBe(expectedErrors[field]);
        }
    }
}
