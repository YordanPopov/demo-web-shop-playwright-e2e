import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class HomePage extends BasePage {
    override readonly URL = '/';
    override readonly TITLE = 'Demo Web Shop';

    /* Components */
    private header: HeaderComponent;
    private footer: FooterComponent;

    /* Home page specific elements */
    private readonly welcomeTitle: Locator;
    private readonly welcomeText: Locator;
    private readonly featuredProductsSection: Locator;
    private readonly featuredProductCards: Locator;

    constructor(page: Page) {
        super(page);

        /* Components */
        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        /* Home page elements */
        this.welcomeTitle = page.locator('.topic-html-content-header');
        this.welcomeText = page.locator('.topic-html-content-body');
        this.featuredProductsSection = page.locator('.home-page-product-grid');
        this.featuredProductCards = page.locator('.item-box');
    }

    /* Navigation methods */
    async navigateToRegister(): Promise<void> {
        await this.header.clickRegister();
    }

    async navigateToLogin(): Promise<void> {
        await this.header.clickLogIn();
    }

    async logout(): Promise<void> {
        await this.header.clickLogOut();
    }

    /* Home page specific methods */
    async isUserLoggedIn(): Promise<boolean> {
        return await this.header.isUserLoggedIn();
    }
}
