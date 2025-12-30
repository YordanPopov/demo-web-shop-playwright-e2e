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

    /* My account links */
    private readonly myAccountLink: Locator;
    private readonly ordersLink: Locator;
    private readonly addressesLink: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly wishlistLink: Locator;

    /* Follow us links */

    constructor(page: Page) {
        this.page = page;

        /* Information */
        this.siteMapLink = page.locator('.footer a[href="/sitemap"]');
        this.shippingReturnsLink = page.locator('.footer a[href="/shipping-returns"]');
        this.privacyNoticeLink = page.locator('.footer a[href="/privacy-policy"]');
        this.conditionsOfUseLink = page.locator('.footer a[href="/conditions-of-use"]');
        this.aboutUsLink = page.locator('.footer a[href="/about-us"]');
        this.contactUsLink = page.locator('.footer a[href="/contactus"]');

        /* Account */
        this.myAccountLink = page.locator('.footer a[href="/customer/info"]');
        this.ordersLink = page.locator('.footer a[href="/customer/orders"]');
        this.addressesLink = page.locator('.footer a[href="/customer/addresses"]');
        this.shoppingCartLink = page.locator('.footer a[href="/cart"]');
        this.wishlistLink = page.locator('.footer a[href="/wishlist"]');
    }
}
