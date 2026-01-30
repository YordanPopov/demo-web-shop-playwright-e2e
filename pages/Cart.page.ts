import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class CartPage extends BasePage {
    override readonly URL = 'https://demowebshop.tricentis.com/cart';
    override readonly TITLE = 'Demo Web Shop. Shopping Cart';

    /* Components */
    private header: HeaderComponent;
    private footer: FooterComponent;

    private readonly pageTitle: Locator;
    private readonly cartTable: Locator;
    private readonly cartItemRows: Locator;
    private readonly emptyCartMessage: Locator;

    /* Product elements */
    private readonly productName: Locator;
    private readonly productImage: Locator;
    private readonly productPrice: Locator;
    private readonly productQtyInput: Locator;
    private readonly productSubtotal: Locator;
    private readonly productRemoveCheckbox: Locator;

    /* Buttons */
    private readonly updateCartButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly checkoutButton: Locator;

    /* Discount & Gift Cards elements */
    private readonly discountCodeInput: Locator;
    private readonly applyDiscountButton: Locator;
    private readonly giftCardCodeInput: Locator;
    private readonly addGiftCardButton: Locator;

    /* Totals */
    private readonly subTotal: Locator;
    private readonly shippingCost: Locator;
    private readonly tax: Locator;
    private readonly orderTotal: Locator;

    /* Terms of service */
    private readonly termsCheckbox: Locator;
    private readonly termsReadLink: Locator;
    private readonly termsWarningDialog: Locator;

    constructor(page: Page) {
        super(page);

        /* Components */
        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        this.pageTitle = page.locator('.page-title h1');
        this.cartTable = page.locator('table.cart');
        this.cartItemRows = page.locator('table.cart tbody tr');
        this.emptyCartMessage = page.locator('.order-summary-content');

        /* Product elements */
        this.productName = page.locator('.product-name');
        this.productImage = page.locator('.product-picture img');
        this.productPrice = page.locator('.product-unit-price');
        this.productQtyInput = page.locator('.qty input');
        this.productSubtotal = page.locator('.product-subtotal');
        this.productRemoveCheckbox = page.locator('.remove-from-cart input[type="checkbox"]');

        /* Buttons */
        this.updateCartButton = page.locator('.update-cart-button');
        this.continueShoppingButton = page.locator('.continue-shopping-button');
        this.checkoutButton = page.locator('.checkout-button');

        /* Discount & Gift Cards elements */
        this.discountCodeInput = page.locator('input[name="discountcouponcode"]');
        this.applyDiscountButton = page.locator('input[name="applydiscountcouponcode"]');
        this.giftCardCodeInput = page.locator('input[name="giftcardcouponcode"]');
        this.addGiftCardButton = page.locator('input[name="applygiftcardcouponcode"]');

        /* Totals */
        this.subTotal = page.locator('.product-price').first();
        this.shippingCost = page.locator('.product-price').nth(1);
        this.tax = page.locator('.product-price').nth(2);
        this.orderTotal = page.locator('.product-price').last();

        /* Terms of service */
        this.termsCheckbox = page.locator('#termsofservice');
        this.termsReadLink = page.locator('.terms-of-service .read');
        this.termsWarningDialog = page.locator('#terms-of-service-warning-box');
    }

    async getPageTitle(): Promise<string> {
        return (await this.pageTitle.textContent()) || '';
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.emptyCartMessage.isVisible();
    }

    async getCartItemsCount(): Promise<number> {
        return await this.cartItemRows.count();
    }

    async getProductNames(): Promise<string[]> {
        const productNames = await this.productName.allTextContents();
        return productNames.map((name) => name.trim());
    }

    async getProductPrice(productIndex: number = 0): Promise<number> {
        const priceText = await this.productPrice.nth(productIndex).textContent();
        return parseFloat(priceText.replace(/[^\d.]/g, '') || '0');
    }

    async getProductQuantity(productIndex: number = 0): Promise<number> {
        const productQtyText = await this.productQtyInput.nth(productIndex).inputValue();
        return parseInt(productQtyText);
    }
}
