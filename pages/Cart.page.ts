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
    private readonly productTitle: Locator;
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
    private readonly discountMessage: Locator;

    /* Shipping estimation */
    private readonly countryDropdown: Locator;
    private readonly stateDropdown: Locator;
    private readonly zipCodeInput: Locator;
    private readonly estimateShippingButton: Locator;

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
        this.productTitle = page.locator('.product-name');
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
        this.discountMessage = page.locator('.coupon-box .message');

        /* Shipping estimation */
        this.countryDropdown = page.locator('#CountryId');
        this.stateDropdown = page.locator('#StateProvinceId');
        this.zipCodeInput = page.locator('#ZipPostalCode');
        this.estimateShippingButton = page.locator('.estimate-shipping-button');

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

    /* Cart verification methods */
    async getCartItemsCount(): Promise<number> {
        return await this.cartItemRows.count();
    }

    async hasItems(): Promise<boolean> {
        const count = await this.getCartItemsCount();
        return count > 0;
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.emptyCartMessage.isVisible();
    }

    async isProductInCart(productTitle: string): Promise<boolean> {
        const titles = await this.getProductTitles();
        return titles.some((title) => title.includes(productTitle));
    }

    async getCartBadgeCount(): Promise<number> {
        return await this.header.getCartItemCount();
    }

    /* Product information methods */
    async getPageTitle(): Promise<string> {
        return (await this.pageTitle.textContent()) || '';
    }

    async getProductTitles(): Promise<string[]> {
        const productTitles = await this.productTitle.allTextContents();
        return productTitles.map((name) => name.trim());
    }

    async getProductPrice(productIndex: number = 0): Promise<number> {
        const priceText = await this.productPrice.nth(productIndex).textContent();
        return parseFloat(priceText.replace(/[^\d.]/g, '') || '0');
    }

    async getProductPriceByTitle(productTitle: string): Promise<number> {
        const productTitles = await this.getProductTitles();
        const productIndex = productTitles.findIndex((title) => title.includes(productTitle));

        if (productIndex === -1) {
            throw new Error(`Product with title '${productTitle}' not found in cart.`);
        }

        return await this.getProductPrice(productIndex);
    }

    async getProductQuantity(productIndex: number = 0): Promise<number> {
        const productQtyText = await this.productQtyInput.nth(productIndex).inputValue();
        return parseInt(productQtyText || '1');
    }

    async getProductSubtotal(productIndex: number = 0): Promise<number> {
        const productSubtotalText = await this.productSubtotal.nth(productIndex).textContent();
        return parseFloat(productSubtotalText.replace(/[^\d.]/g, '') || '0');
    }

    /* Cart summary methods */
    async getSubtotal(): Promise<number> {
        const subtotal = await this.subTotal.textContent();
        return parseFloat(subtotal.replace(/[^\d.]/g, '') || '0');
    }

    async getShipping(): Promise<number> {
        try {
            const text = await this.shippingCost.textContent();
            return parseFloat(text.replace(/[^\d.]/g, '') || '0');
        } catch {
            return 0;
        }
    }

    async getTax(): Promise<number> {
        try {
            const text = await this.tax.textContent();
            return parseFloat(text.replace(/[^\d.]/g, '') || '0');
        } catch {
            return 0;
        }
    }

    async getTotal(): Promise<number> {
        try {
            const text = await this.orderTotal.textContent();
            return parseFloat(text.replace(/[^\d.]/g, '') || '0');
        } catch {
            return 0;
        }
    }

    async verifyCartSummary(): Promise<{
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    }> {
        return {
            subtotal: await this.getSubtotal(),
            shipping: await this.getShipping(),
            tax: await this.getTax(),
            total: await this.getTotal(),
        };
    }

    /* Product action methods */
    async removeProduct(productIndex: number = 0): Promise<void> {
        await this.productRemoveCheckbox.nth(productIndex).check();
        await this.updateCartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async removeProductByTitle(productTitle: string): Promise<void> {
        const titles = await this.getProductTitles();
        const productIndex = titles.findIndex((title) => title.includes(productTitle));

        if (productIndex === -1) {
            throw new Error(`Product with title '${productTitle}' not found in cart.`);
        }

        await this.updateCartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async removeAllProducts(): Promise<void> {
        const count = await this.productRemoveCheckbox.count();

        for (let index = 0; index < count; index++) {
            await this.productRemoveCheckbox.nth(index).check();
        }

        await this.updateCartButton.click();
    }

    async updateProductQuantity(productIndex: number, newQty: number): Promise<void> {
        await this.productQtyInput.nth(productIndex).fill(String(newQty));
        await this.updateCartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async updateProductQuantityByTitle(productTitle: string, newQty: number): Promise<void> {
        const titles = await this.getProductTitles();
        const productIndex = titles.findIndex((title) => title.includes(productTitle));

        if (productIndex === -1) {
            throw new Error(`Product with title '${productTitle}' not found in cart.`);
        }

        await this.updateProductQuantity(productIndex, newQty);
    }

    /* Discount & Gift card methods */
    async applyDiscountCode(code: string): Promise<void> {
        await this.discountCodeInput.fill(code);
        await this.applyDiscountButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async applyGiftCard(code: string): Promise<void> {
        await this.giftCardCodeInput.fill(code);
        await this.addGiftCardButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getDiscountMessage(): Promise<string> {
        try {
            return this.discountMessage.textContent();
        } catch {
            return '';
        }
    }

    /* Shipping estimation methods */
    async estimateShipping(country: string, state?: string, zipCode?: string): Promise<void> {
        await this.countryDropdown.selectOption({ label: country });

        if (state) {
            this.stateDropdown.selectOption({ label: state });
        }

        if (zipCode) {
            this.zipCodeInput.fill(zipCode);
        }

        await this.estimateShippingButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Checkout methods */
    async acceptTerms(): Promise<void> {
        await this.termsCheckbox.check();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async checkoutWithTerms(): Promise<void> {
        await this.acceptTerms();
        await this.proceedToCheckout();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}
