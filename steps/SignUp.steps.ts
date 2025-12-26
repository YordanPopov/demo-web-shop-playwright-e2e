import { Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

export default class SignUpSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async registerUser(data: {
        gender?: 'male' | 'female';
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }): Promise<void> {
        await this.signUpPage.register(data);

        await this.signUpPage.verifyRegistration();
    }
}
