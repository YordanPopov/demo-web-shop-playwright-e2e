import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class ProductPage extends BasePage {
    override readonly URL = 'https://demowebshop.tricentis.com/';
    override readonly TITLE = 'Demo Web Shop.';

    private header: HeaderComponent;
    private footer: FooterComponent;

    /* Product information */
    private readonly productName: Locator;
    private readonly productDescription: Locator;
    private readonly productFullDescription: Locator;
    private readonly productImage: Locator;
    private readonly stockStatus: Locator;
    private readonly freeShippingLabel: Locator;
    private readonly oldPrice: Locator;
    private readonly currentPrice: Locator;

    /* Reviews */
    private readonly reviewCount: Locator;
    private readonly addReviewLink: Locator;
    private readonly viewReviewLink: Locator;

    /* Add to cart */
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;

    /* Action buttons */
    private readonly emailFriendButton: Locator;
    private readonly addToWishlistButton: Locator;
    private readonly addToCompareListButton: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        /* Product information */
        this.productName = page.locator('.product-name');
        this.productDescription = page.locator('.short-description');
        this.productFullDescription = page.locator('.full-description > p');
        this.productImage = page.locator('.picture > img');
        this.stockStatus = page.locator('.stock span.value');
        this.freeShippingLabel = page.locator('.free-shipping');
        this.oldPrice = page.locator('.old-product-price span');
        this.currentPrice = page.locator('.product-price span');

        /* Reviews */
        this.reviewCount = page.locator('.product-review-links a').first();
        this.addReviewLink = page.locator('.product-review-links a').last();
        this.viewReviewLink = page.locator('.product-review-links a').first();

        /* Add to cart */
        this.quantityInput = page.locator('.qty-input');
        this.addToCartButton = page.locator('.add-to-cart-button');

        /* Action buttons */
        this.emailFriendButton = page.locator('.email-a-friend-button');
        this.addToWishlistButton = page.locator('.add-to-wishlist-button');
        this.addToCompareListButton = page.locator('.add-to-compare-list-button');
    }

    /* Navigation methods */
    async navigateToProduct(productSlug: string): Promise<void> {
        await this.page.goto(`${this.URL}/${productSlug}`, { waitUntil: 'domcontentloaded' });
    }

    /* Product information method */
    async getProductName(): Promise<string> {
        return (await this.productName.textContent())?.trim() || '';
    }

    async getProductDescription(): Promise<string> {
        return (await this.productDescription.textContent())?.trim() || '';
    }

    async getProductOldPrice(): Promise<number> {
        const textPrice = await this.oldPrice.textContent();
        return parseFloat(textPrice?.replace(/[^\d.]/g, '') || '0');
    }

    async getProductCurrentPrice(): Promise<number> {
        const textPrice = await this.currentPrice.textContent();
        return parseFloat(textPrice?.replace(/[^\d.]/g, '') || '0');
    }

    /* Availability methods */
    async getStockStatus(): Promise<string> {
        return (await this.stockStatus.textContent()).trim() || '';
    }

    async isInStock(): Promise<boolean> {
        const statusText = await this.getStockStatus();
        return statusText?.toLowerCase().includes('in stock') || false;
    }

    async hasFreeShipping(): Promise<boolean> {
        try {
            await this.freeShippingLabel.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
}
