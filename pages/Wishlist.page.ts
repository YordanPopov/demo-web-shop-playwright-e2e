import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class WishlistPage extends BasePage {
    override readonly URL = 'https://demowebshop.tricentis.com/wishlist';
    override readonly TITLE = 'Demo Web Shop. Wishlist';

    /* Components */
    readonly header: HeaderComponent;
    readonly footer: FooterComponent;

    /* Page elements */
    private readonly pageTitle: Locator;
    private readonly emptyWishlistMessage: Locator;
    private readonly wishlistTable: Locator;

    /* Table elements */
    private readonly wishlistItems: Locator;
    private readonly removeCheckboxes: Locator;
    private readonly addToCartCheckboxes: Locator;
    private readonly productImages: Locator;
    private readonly productLinks: Locator;
    private readonly productPrices: Locator;
    private readonly quantityInputs: Locator;
    private readonly subTotal: Locator;

    /* Action buttons */
    private readonly updateWishlistButton: Locator;
    private readonly addToCartButton: Locator;
    private readonly emailFriendButton: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        /* Page elements */
        this.pageTitle = page.locator('div.page-title > h1');
        this.emptyWishlistMessage = page.locator('.page-body > div.wishlist-content');
        this.wishlistTable = page.locator('table.cart');

        /* Table elements */
        this.wishlistItems = page.locator('.cart-item-row');
        this.removeCheckboxes = page.locator('.remove-from-cart input[type="checkbox"]');
        this.addToCartCheckboxes = page.locator('.add-to-cart input[type="checkbox"]');
        this.productImages = page.locator('.product-picture > img');
        this.productLinks = page.locator('.product > a');
        this.productPrices = page.locator('.product-unit-price');
        this.quantityInputs = page.locator('.qty-input');
        this.subTotal = page.locator('.product-subtotal');

        /* Action buttons */
        this.updateWishlistButton = page.locator('.common-buttons input[name="updatecart"]');
        this.addToCartButton = page.locator('.common-buttons input[name="addtocartbutton"]');
        this.emailFriendButton = page.locator(' input.email-a-friend-wishlist-button');
    }

    async getItemsCount(): Promise<number> {
        return await this.wishlistItems.count();
    }

    async hasItems(): Promise<boolean> {
        const count = await this.getItemsCount();
        return count > 0;
    }

    async isEmpty(): Promise<boolean> {
        return !(await this.hasItems());
    }

    async getWishListBadgeCount(): Promise<number> {
        return await this.header.getWishListCount();
    }

    async getProductTtitles(): Promise<string[]> {
        const titles = await this.productLinks.allTextContents();
        return titles.map((title) => title.trim());
    }

    async getProductTitle(index: number): Promise<string> {
        return (await this.productLinks.nth(index).textContent()) || '';
    }

    async getProductPrice(index: number): Promise<number> {
        const priceText = await this.productPrices.nth(index).textContent();
        return parseFloat(priceText?.replace(/[^\d.]/g, '') || '0');
    }

    async getProductQuantity(index: number): Promise<number> {
        const value = await this.quantityInputs.nth(index).inputValue();
        return parseInt(value || '1');
    }

    async getProductSubtotal(index: number): Promise<number> {
        const textSubtotal = await this.subTotal.nth(index).textContent();
        return parseFloat(textSubtotal?.replace(/[^\d.]/g, '') || '0');
    }

    async isProductInWishlist(productTitle: string): Promise<boolean> {
        const titles = await this.getProductTtitles();
        return titles.some((title) => title.includes(productTitle));
    }
}
