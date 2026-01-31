import { Page } from '@playwright/test';

/* Page objects */
import HomePage from '@pages/Home.page';
import SignUpPage from '@pages/SignUp.page';
import LogInPage from '@pages/LogIn.page';
import SearchResultsPage from '@pages/SearchResults.page';
import CategoryPage from '@pages/Category.page';
import WishlistPage from '@pages/Wishlist.page';
import ProductPage from '@pages/Product.page';
import CartPage from '@pages/Cart.page';

export default class PageFactory {
    readonly homePage: HomePage;
    readonly signUpPage: SignUpPage;
    readonly logInPage: LogInPage;
    readonly searchResultsPage: SearchResultsPage;
    readonly categoryPage: CategoryPage;
    readonly wishlistPage: WishlistPage;
    readonly productPage: ProductPage;
    readonly cartPage: CartPage;

    constructor(protected page: Page) {
        this.homePage = new HomePage(page);
        this.signUpPage = new SignUpPage(page);
        this.logInPage = new LogInPage(page);
        this.searchResultsPage = new SearchResultsPage(page);
        this.categoryPage = new CategoryPage(page);
        this.wishlistPage = new WishlistPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
    }
}
