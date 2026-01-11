import { Page, Locator } from '@playwright/test';

export class FooterComponent {
    private readonly page: Page;

    /* Information links */
    private readonly siteMapLink: Locator;
    private readonly shippingReturnsLink: Locator;
    private readonly privacyNoticeLink: Locator;
    private readonly conditionsOfUseLink: Locator;
    private readonly aboutUsLink: Locator;
    private readonly contactUsLink: Locator;

    /* Customer service links */
    private readonly searchLink: Locator;
    private readonly newsLink: Locator;
    private readonly blogLink: Locator;
    private readonly recentlyViewedProductsLink: Locator;
    private readonly compareProductsList: Locator;
    private readonly newProducts: Locator;

    /* My account links */
    private readonly myAccountLink: Locator;
    private readonly ordersLink: Locator;
    private readonly addressesLink: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly wishlistLink: Locator;

    /* Follow us links */
    private readonly facebook: Locator;
    private readonly twitter: Locator;
    private readonly rss: Locator;
    private readonly youtube: Locator;
    private readonly googlePlus: Locator;

    constructor(page: Page) {
        this.page = page;

        /* Information links */
        this.siteMapLink = page.locator('.footer a[href="/sitemap"]');
        this.shippingReturnsLink = page.locator('.footer a[href="/shipping-returns"]');
        this.privacyNoticeLink = page.locator('.footer a[href="/privacy-policy"]');
        this.conditionsOfUseLink = page.locator('.footer a[href="/conditions-of-use"]');
        this.aboutUsLink = page.locator('.footer a[href="/about-us"]');
        this.contactUsLink = page.locator('.footer a[href="/contactus"]');

        /* Customer service links */
        this.searchLink = page.locator('.footer a[href="/search"]');
        this.newsLink = page.locator('.footer a[href="/news"]');
        this.blogLink = page.locator('.footer a[href="/blog"]');
        this.recentlyViewedProductsLink = page.locator('.footer a[href="/recentlyviewedproducts"]');
        this.compareProductsList = page.locator('.footer a[href="/compareproducts"]');
        this.newProducts = page.locator('.footer a[href="/newproducts"]');

        /* My account */
        this.myAccountLink = page.locator('.footer a[href="/customer/info"]');
        this.ordersLink = page.locator('.footer a[href="/customer/orders"]');
        this.addressesLink = page.locator('.footer a[href="/customer/addresses"]');
        this.shoppingCartLink = page.locator('.footer a[href="/cart"]');
        this.wishlistLink = page.locator('.footer a[href="/wishlist"]');

        /* Follow us links */
        this.facebook = page.locator('.footer li.facebook a');
        this.twitter = page.locator('.footer li.twitter a');
        this.rss = page.locator('.footer li.rss a');
        this.youtube = page.locator('.footer li.youtube a');
        this.googlePlus = page.locator('.footer li.google-plus a');
    }

    /* Navigation methods */
    async clickSearch(): Promise<void> {
        await this.searchLink.click();
    }

    async clickNews(): Promise<void> {
        await this.newsLink.click();
    }

    async clickRecentlyViewedProducts(): Promise<void> {
        await this.recentlyViewedProductsLink.click();
    }

    async clickCompareProductsList(): Promise<void> {
        await this.compareProductsList.click();
    }

    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickOrders(): Promise<void> {
        await this.ordersLink.click();
    }

    async clickShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async clickWishlist(): Promise<void> {
        await this.wishlistLink.click();
    }
}
