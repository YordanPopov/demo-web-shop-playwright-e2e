import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    private readonly page: Page;

    /* Header logo */
    private readonly logo: Locator;

    /* User links */
    private readonly registerLink: Locator;
    private readonly logInLink: Locator;
    private readonly logOutLink: Locator;
    private readonly accountLink: Locator;
    private readonly userEmailText: Locator;

    /* Cart & Wishlist */
    private readonly cartLink: Locator;
    private readonly wishListLink: Locator;

    /* Search */
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    /* Navigation menu */
    private readonly booksLink: Locator;
    private readonly computersLink: Locator;
    private readonly electronicsLink: Locator;
    private readonly apparelShoesLink: Locator;
    private readonly digitalDownloadsLink: Locator;
    private readonly jewelryLink: Locator;
    private readonly giftCardsLink: Locator;

    /* Submenu items */
    private readonly desktopsLink: Locator;
    private readonly notebooksLink: Locator;
    private readonly accessoriesLink: Locator;

    constructor(page: Page) {
        this.page = page;

        /* Logo */
        this.logo = page.getByAltText(/Tricentis Demo Web Shop/);

        /* User links */
        this.registerLink = page.getByRole('link', { name: /Register/ });
        this.logInLink = page.getByRole('link', { name: /Log in/ });
        this.logOutLink = page.getByRole('link', { name: /Log out/ });
        this.accountLink = page.locator('div.header-links a.account');
        this.userEmailText = page.locator('div.header-links a.account');

        /* cart & WishList */
        this.cartLink = page.getByRole('link', { name: /Shopping cart/ });
        this.wishListLink = page.getByRole('link', { name: /Wishlist/ });

        /* Search */
        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.locator('.search-box-button');

        /* Navigation menu */
        this.booksLink = page.locator('.top-menu a[href="/books"]');
        this.computersLink = page.locator('.top-menu a[href="/computers"]');
        this.electronicsLink = page.locator('.top-menu a[href="/electronics"]');
        this.apparelShoesLink = page.locator('.top-menu a[href="/apparel-shoes"]');
        this.digitalDownloadsLink = page.locator('.top-menu a[href="/digital-downloads"]');
        this.jewelryLink = page.locator('.top-menu a[href="/jewelry"]');
        this.giftCardsLink = page.locator('.top-menu a[href="/gift-cards"]');

        /* Submenu items */
        this.desktopsLink = page.locator('.top-menu a[href="/desktops"]');
        this.notebooksLink = page.locator('.top-menu a[href="/notebooks"]');
        this.accessoriesLink = page.locator('.top-menu a[href="/accessories"]');
    }

    /* User authentication methods */
    async clickLogIn(): Promise<void> {
        await this.logInLink.click();
    }

    async clickRegister(): Promise<void> {
        await this.registerLink.click();
    }

    async clickLogOut(): Promise<void> {
        await this.logOutLink.click();
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.logOutLink.isVisible();
    }

    async getLoggedInUserEmail(): Promise<string> {
        return (await this.userEmailText.textContent()) || '';
    }

    /* Navigation methods */
    async navigateToBooks(): Promise<void> {
        await this.booksLink.click();
    }

    async navigateToComputers(): Promise<void> {
        await this.computersLink.click();
    }

    async navigateToElectronics(): Promise<void> {
        await this.electronicsLink.click();
    }

    async navigateToApparelShoes(): Promise<void> {
        await this.apparelShoesLink.click();
    }

    async navigateToDigitalsDownloads(): Promise<void> {
        await this.digitalDownloadsLink.click();
    }

    async navigateToJewelry(): Promise<void> {
        await this.jewelryLink.click();
    }

    async navigateToGiftCards(): Promise<void> {
        await this.giftCardsLink.click();
    }

    /* Submenu methods */
    async hoverOverComputers(): Promise<void> {
        await this.computersLink.hover();
    }

    async navigateToDesktops(): Promise<void> {
        await this.hoverOverComputers();
        await this.desktopsLink.click();
    }

    async navigateToNotebooks(): Promise<void> {
        await this.hoverOverComputers();
        await this.notebooksLink.click();
    }

    async navigateToAccessories(): Promise<void> {
        await this.hoverOverComputers();
        await this.accessoriesLink.click();
    }

    /* Search methods */
    async search(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async clearSearch(): Promise<void> {
        await this.searchInput.clear();
    }

    /* Cart & Wishlist methods */
    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async openWishlist(): Promise<void> {
        await this.wishListLink.click();
    }
}
