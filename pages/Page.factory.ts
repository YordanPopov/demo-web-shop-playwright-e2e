import { Page } from '@playwright/test';

/* Page objects */
import SignUpPage from '@pages/SignUp.page';
import LogInPage from '@pages/LogIn.page';

export default class PageFactory {
    readonly signUpPage: SignUpPage;
    readonly logInPage: LogInPage;

    constructor(protected page: Page) {
        this.signUpPage = new SignUpPage(page);
        this.logInPage = new LogInPage(page);
    }
}
