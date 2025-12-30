import { Page } from '@playwright/test';

/* Page objects */
import HomePage from '@pages/Home.page';
import SignUpPage from '@pages/SignUp.page';
import LogInPage from '@pages/LogIn.page';

export default class PageFactory {
    readonly homePage: HomePage;
    readonly signUpPage: SignUpPage;
    readonly logInPage: LogInPage;

    constructor(protected page: Page) {
        this.homePage = new HomePage(page);
        this.signUpPage = new SignUpPage(page);
        this.logInPage = new LogInPage(page);
    }
}
