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

    /* Navigation methods */
    async openWishlist(): Promise<void> {
        await this.header.openWishlist();
    }
    /* Product verification methods */
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

    /* Product information methods */
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

    /* Product action methods */
    async removeProduct(index: number): Promise<void> {
        await this.removeCheckboxes.nth(index).check();
        await this.updateWishlistButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async removeProductByTitle(productTitle: string): Promise<void> {
        const productTitles = await this.getProductTtitles();
        const index = productTitles.findIndex((title) => title === productTitle);

        if (index === -1) {
            throw new Error(`Product with title "${productTitle}" not found in wishlist.`);
        }

        await this.removeProduct(index);
    }

    async removeAllProducts(): Promise<void> {
        const productsCount = await this.removeCheckboxes.count();

        for (let i = 0; i < productsCount; i++) {
            await this.removeCheckboxes.nth(i).check();
        }

        await this.updateWishlistButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async updateQuantity(index: number, quantity: number): Promise<void> {
        await this.quantityInputs.nth(index).fill(String(quantity));
        await this.updateWishlistButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async updateQuantityByTitle(productTitle: string, quantity: number): Promise<void> {
        const productTitles = await this.getProductTtitles();
        const index = productTitles.findIndex((title) => title === productTitle);

        if (index === -1) {
            throw new Error(`Product with title "${productTitle}" not found in wishlist.`);
        }

        await this.updateQuantity(index, quantity);
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Add product to cart methods */
    async selectProductForCart(index: number): Promise<void> {
        await this.addToCartCheckboxes.nth(index).check();
    }

    async selectProductForCartByTitle(productTitle: string): Promise<void> {
        const productTitles = await this.getProductTtitles();
        const index = productTitles.findIndex((title) => title === productTitle);

        if (index === -1) {
            throw new Error(`Product with title "${productTitle}" not found in wishlist`);
        }

        await this.selectProductForCart(index);
    }

    async selectAllProductsForCart(): Promise<void> {
        const productsCount = await this.addToCartCheckboxes.count();

        for (let i = 0; i <= productsCount; i++) {
            await this.addToCartCheckboxes.nth(i).check();
        }
    }

    async addSelectedToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addProductToCart(index: number): Promise<void> {
        await this.selectProductForCart(index);
        await this.addSelectedToCart();
    }

    async addProductToCartByTitle(productTitle: string): Promise<void> {
        await this.selectProductForCartByTitle(productTitle);
        await this.addSelectedToCart();
    }

    async addAllToCart(): Promise<void> {
        await this.addAllToCart();
        await this.addSelectedToCart();
    }

    async getTotalValue(): Promise<number> {
        const subtotals = await this.subTotal.allTextContents();
        let total = 0;

        for (const text of subtotals) {
            const value = parseFloat(text?.replace(/[^\d.]/g, '') || '0');
            total += value;
        }

        return total;
    }
}
