import { Page } from '@playwright/test';

/* Page objects */
import HomePage from '@pages/Home.page';
import SignUpPage from '@pages/SignUp.page';
import LogInPage from '@pages/LogIn.page';
import SearchResultsPage from '@pages/SearchResults.page';
import CategoryPage from '@pages/Category.page';

export default class PageFactory {
    readonly homePage: HomePage;
    readonly signUpPage: SignUpPage;
    readonly logInPage: LogInPage;
    readonly searchResultsPage: SearchResultsPage;
    readonly categoryPage: CategoryPage;

    constructor(protected page: Page) {
        this.homePage = new HomePage(page);
        this.signUpPage = new SignUpPage(page);
        this.logInPage = new LogInPage(page);
        this.searchResultsPage = new SearchResultsPage(page);
        this.categoryPage = new CategoryPage(page);
    }
}
