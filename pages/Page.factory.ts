import { Page } from '@playwright/test';

/* Page objects */
import SignUpPage from '@pages/SignUp.page';

export default class PageFactory {
    readonly signUpPage: SignUpPage;

    constructor(protected page: Page) {
        this.signUpPage = new SignUpPage(page);
    }
}
