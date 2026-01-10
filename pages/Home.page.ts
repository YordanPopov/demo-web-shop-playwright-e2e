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
    private readonly newsLetterInput: Locator;
    private readonly newsLetterButton: Locator;

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

        /* Newsletter */
        this.newsLetterInput = page.locator('#newsletter-email');
        this.newsLetterButton = page.locator('#newsletter-subscribe-button');
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

    async navigateToCategory(category: string): Promise<void> {
        await this.header.navigateToCategory(category);
    }

    /* Home page specific methods */
    async getWelcomeTitle(): Promise<string> {
        return (await this.welcomeTitle.textContent()) || '';
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.header.isUserLoggedIn();
    }

    async isUserLoggedOut(): Promise<boolean> {
        return await this.header.isUserLoggedOut();
    }

    async searchProduct(query: string): Promise<void> {
        await this.header.search(query);
    }

    async getFeaturedProducts(): Promise<string[]> {
        const products = await this.featuredProductCards.all();
        let titles: string[] = [];

        for (const product of products) {
            const title = await product.locator('.product-title a').textContent();

            if (title) {
                titles.push(title);
            }
        }

        return titles;
    }

    async addFeaturedProductToCart(index: number): Promise<void> {
        await this.featuredProductCards
            .nth(index)
            .locator('.product-box-add-to-cart-button')
            .click();
    }

    async subscribeToNewsLetter(email: string): Promise<void> {
        await this.newsLetterInput.fill(email);
        await this.newsLetterButton.click();
    }
}
