import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class CheckoutPage extends BasePage {
    override readonly URL = 'https://demowebshop.tricentis.com/onepagecheckout';
    override readonly TITLE = 'Demo Web Shop. Checkout';

    /* Components */
    private header: HeaderComponent;
    private footer: FooterComponent;

    /* Page elements */
    private readonly pageTitle: Locator;
    private readonly checkoutSteps: Locator;

    /* Step:1 - Billing Address */
    private readonly billingSection: Locator;
    private readonly billingAddressSelect: Locator;
    private readonly billingFirstName: Locator;
    private readonly billingLastName: Locator;
    private readonly billingEmail: Locator;
    private readonly billingCompany: Locator;
    private readonly billingCountry: Locator;
    private readonly billingState: Locator;
    private readonly billingCity: Locator;
    private readonly billingAddress1: Locator;
    private readonly billingAddress2: Locator;
    private readonly billingPostalCode: Locator;
    private readonly billingPhoneNumber: Locator;
    private readonly billingFaxNumber: Locator;
    private readonly billingContinueButton: Locator;

    /* Step:2 - Shipping Address */
    private readonly shippingSection: Locator;
    private readonly shippingAddressSelect: Locator;
    private readonly shippingFirstName: Locator;
    private readonly shippingLastName: Locator;
    private readonly shippingEmail: Locator;
    private readonly shippingCompany: Locator;
    private readonly shippingCountry: Locator;
    private readonly shippingState: Locator;
    private readonly shippingCity: Locator;
    private readonly shippingAddress1: Locator;
    private readonly shippingAddress2: Locator;
    private readonly shippingPostalCode: Locator;
    private readonly shippingPhoneNumber: Locator;
    private readonly shippingFaxNumber: Locator;
    private readonly pickupInStoreCheckbox: Locator;
    private readonly shippingBackButton: Locator;
    private readonly shippingContinueButton: Locator;

    /* Step 3: Shipping method  */
    private readonly shippingMethodSection: Locator;
    private readonly shippingMethodRadios: Locator;
    private readonly shippingMethodBackButton: Locator;
    private readonly shippingMethodContinueButton: Locator;

    /* Step 4: Payment method */
    private readonly paymentMethodSection: Locator;
    private readonly paymentMethodRadios: Locator;
    private readonly paymentMethodBackButton: Locator;
    private readonly paymentMethodContinueButton: Locator;

    /* Step 5: Payment information */
    private readonly paymentInfoSection: Locator;
    private readonly paymentInfoText: Locator;
    private readonly paymentInfoBackButton: Locator;
    private readonly paymentInfoContinueButton: Locator;

    /* Step 6: Confirm order */
    private readonly confirmOrderSection: Locator;
    private readonly confirmOrderBackButton: Locator;
    private readonly confirmOrderButton: Locator;

    /* Billing Address Info */
    private readonly billingInfoName: Locator;
    private readonly billingInfoEmail: Locator;
    private readonly billingInfoPhone: Locator;
    private readonly billingInfoAddress: Locator;
    private readonly billingInfoCountry: Locator;
    private readonly billingPaymentMethod: Locator;

    /* Shipping Address Info */
    private readonly shippingInfoName: Locator;
    private readonly shippingInfoEmail: Locator;
    private readonly shippingInfoPhone: Locator;
    private readonly shippingInfoAddress: Locator;
    private readonly shippingInfoCountry: Locator;
    private readonly shippingMethodDisplay: Locator;

    /* Order Totals */
    private readonly subTotalValue: Locator;
    private readonly shippingCostValue: Locator;
    private readonly paymentFeeValue: Locator;
    private readonly taxValue: Locator;
    private readonly orderTotalValue: Locator;

    constructor(page: Page) {
        super(page);

        /* Components */
        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        /*Page elements */
        this.pageTitle = page.locator('.page-title');
        this.checkoutSteps = page.locator('#checkout-steps');

        /* Step 1: Billing Address */
        this.billingSection = page.locator('#checkout-step-billing');
        this.billingAddressSelect = page.locator('#billing-address-select');
        this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
        this.billingLastName = page.locator('#BillingNewAddress_LastName');
        this.billingEmail = page.locator('#BillingNewAddress_Email');
        this.billingCompany = page.locator('#BillingNewAddress_Company');
        this.billingCountry = page.locator('#BillingNewAddress_CountryId');
        this.billingState = page.locator('#BillingNewAddress_StateProvinceId');
        this.billingCity = page.locator('#BillingNewAddress_City');
        this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
        this.billingAddress2 = page.locator('#BillingNewAddress_Address2');
        this.billingPostalCode = page.locator('#BillingNewAddress_ZipPostalCode');
        this.billingPhoneNumber = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingFaxNumber = page.locator('#BillingNewAddress_FaxNumber');
        this.billingContinueButton = page.locator(
            '#billing-buttons-container input[title="Continue"]'
        );

        /* Step 2: Shipping Address */
        this.shippingSection = page.locator('#checkout-step-shipping');
        this.shippingAddressSelect = page.locator('#shipping-address-select');
        this.shippingFirstName = page.locator('#ShippingNewAddress_FirstName');
        this.shippingLastName = page.locator('#ShippingNewAddress_LastName');
        this.shippingEmail = page.locator('#ShippingNewAddress_Email');
        this.shippingCompany = page.locator('#ShippingNewAddress_Company');
        this.shippingCountry = page.locator('#ShippingNewAddress_CountryId');
        this.shippingState = page.locator('#ShippingNewAddress_StateProvinceId');
        this.shippingCity = page.locator('#ShippingNewAddress_City');
        this.shippingAddress1 = page.locator('#ShippingNewAddress_Address1');
        this.shippingAddress2 = page.locator('#ShippingNewAddress_Address2');
        this.shippingPostalCode = page.locator('#ShippingNewAddress_ZipPostalCode');
        this.shippingPhoneNumber = page.locator('#ShippingNewAddress_PhoneNumber');
        this.shippingFaxNumber = page.locator('#ShippingNewAddress_FaxNumber');
        this.pickupInStoreCheckbox = page.locator('#PickUpInStore');
        this.shippingBackButton = page.locator('#shipping-buttons-container .back-link a');
        this.shippingContinueButton = page.locator(
            '#shipping-buttons-container input[title="Continue"]'
        );

        /* Step 3: Shipping method  */
        this.shippingMethodSection = page.locator('#checkout-step-shipping-method');
        this.shippingMethodRadios = page.locator('.shipping-method input[type="radio"]');
        this.shippingMethodBackButton = page.locator('#shipping-method-buttons-container p a');
        this.shippingMethodContinueButton = page.locator(
            '#shipping-method-buttons-container input[type="button"]'
        );

        /* Step 4: Payment method */
        this.paymentMethodSection = page.locator('#checkout-step-payment-method');
        this.paymentMethodRadios = page.locator('.payment-method input[type="radio"]');
        this.paymentMethodBackButton = page.locator('#payment-method-buttons-container p a');
        this.paymentMethodContinueButton = page.locator(
            '#payment-method-buttons-container input[type="button"]'
        );

        /* Step 5: Payment information */
        this.paymentInfoSection = page.locator('#checkout-step-payment-info');
        this.paymentInfoText = page.locator('.info p');
        this.paymentInfoBackButton = page.locator('#payment-info-buttons-container p a');
        this.paymentInfoContinueButton = page.locator(
            '#payment-info-buttons-container input[type="button"]'
        );

        /* Step 6: Confirm order */
        this.confirmOrderSection = page.locator('#checkout-step-confirm-order');
        this.confirmOrderBackButton = page.locator('#confirm-order-buttons-container p a');
        this.confirmOrderButton = page.locator(
            '#confirm-order-buttons-container input[type="button"]'
        );

        /* Billing Address Info */
        this.billingInfoName = page.locator('.billing-info .name');
        this.billingInfoEmail = page.locator('.billing-info .email');
        this.billingInfoPhone = page.locator('.billing-info .phone');
        this.billingInfoAddress = page.locator('.billing-info .address1');
        this.billingInfoCountry = page.locator('.billing-info .country');
        this.billingPaymentMethod = page.locator('.billing-info .payment-method');

        /* Shipping Address Info */
        this.shippingInfoName = page.locator('.shipping-info .name');
        this.shippingInfoEmail = page.locator('.shipping-info .email');
        this.shippingInfoPhone = page.locator('.shipping-info .phone');
        this.shippingInfoAddress = page.locator('.shipping-info .address1');
        this.shippingInfoCountry = page.locator('.shipping-info .country');
        this.shippingMethodDisplay = page.locator('.shipping-info .shipping-method');

        /* Order Totals */
        this.subTotalValue = page.locator('.cart-total .product-price').first();
        this.shippingCostValue = page.locator('.cart-total .product-price').nth(1);
        this.paymentFeeValue = page.locator('.cart-total .product-price').nth(2);
        this.taxValue = page.locator('.cart-total .product-price').nth(3);
        this.orderTotalValue = page.locator('.cart-total .product-price strong');
    }

    /* Step 1: Billing address methods */

    async selectExistingBillingAddress(addressText: string): Promise<void> {
        await this.billingAddressSelect.selectOption({ label: addressText });
    }

    async fillNewBillingAddress(address: {
        fisrtName: string;
        lastName: string;
        email: string;
        company?: string;
        country: string;
        state?: string;
        city: string;
        address1: string;
        address2?: string;
        postalCode: string;
        phoneNumber: string;
        fax?: string;
    }): Promise<void> {
        await this.billingFirstName.fill(address.fisrtName);
        await this.billingLastName.fill(address.lastName);
        await this.billingEmail.fill(address.email);

        if (address.company) {
            this.billingCompany.fill(address.company);
        }

        await this.billingCountry.selectOption({ label: address.country });

        if (address.state) {
            await this.billingState.selectOption({ label: address.state });
        }

        await this.billingCity.fill(address.city);
        await this.billingAddress1.fill(address.address1);

        if (address.address2) {
            await this.billingAddress2.fill(address.address2);
        }

        await this.billingPostalCode.fill(address.postalCode);
        await this.billingPhoneNumber.fill(address.phoneNumber);

        if (address.fax) {
            await this.billingFaxNumber.fill(address.fax);
        }
    }

    async continueToShippingAddress(): Promise<void> {
        await this.billingContinueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Step 2: Shipping address methods */
    async selectExistingShippingAddress(addressText: string): Promise<void> {
        await this.shippingAddressSelect.selectOption({ label: addressText });
    }

    async fillNewShippingAddress(address: {
        fisrtName: string;
        lastName: string;
        email: string;
        company?: string;
        country: string;
        state?: string;
        city: string;
        address1: string;
        address2?: string;
        postalCode: string;
        phoneNumber: string;
        fax?: string;
    }): Promise<void> {
        await this.shippingFirstName.fill(address.fisrtName);
        await this.shippingLastName.fill(address.lastName);
        await this.shippingEmail.fill(address.email);

        if (address.company) {
            this.shippingCompany.fill(address.company);
        }

        await this.shippingCountry.selectOption({ label: address.country });

        if (address.state) {
            await this.shippingState.selectOption({ label: address.state });
        }

        await this.shippingCity.fill(address.city);
        await this.shippingAddress1.fill(address.address1);

        if (address.address2) {
            await this.shippingAddress2.fill(address.address2);
        }

        await this.shippingPostalCode.fill(address.postalCode);
        await this.shippingPhoneNumber.fill(address.phoneNumber);

        if (address.fax) {
            await this.shippingFaxNumber.fill(address.fax);
        }
    }

    async selectPickUpInStore(): Promise<void> {
        await this.pickupInStoreCheckbox.check();
    }

    async continueToShippingMethod(): Promise<void> {
        await this.shippingContinueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async backToBillingAddress(): Promise<void> {
        await this.shippingBackButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Step 3: Shipping method actions*/
    async selectShippingMethod(methodName: string): Promise<void> {
        await this.shippingMethodRadios.filter({ hasText: methodName }).check();
    }

    async continueToPaymentMethod(): Promise<void> {
        await this.shippingMethodContinueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async backToShippingAddress(): Promise<void> {
        await this.shippingMethodBackButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Step 4: Payment method actions */
    async selectPaymentMethod(methodName: string): Promise<void> {
        await this.paymentMethodRadios.filter({ hasText: methodName }).check();
    }

    async continueToPaymentInformation(): Promise<void> {
        await this.paymentMethodContinueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async backToShippingMethod(): Promise<void> {
        await this.paymentMethodBackButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Step 5: Payment information methods */
    async getPaymentInformation(): Promise<string> {
        const paymentInfo = (await this.paymentInfoText.textContent())?.trim();
        return paymentInfo || '';
    }

    async continueToConfirmOrder(): Promise<void> {
        await this.paymentInfoContinueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async backToPaymentMethod(): Promise<void> {
        await this.paymentInfoBackButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Step 6: Confirm order methods */
    async confirmOrder(): Promise<void> {
        await this.confirmOrderButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async backToPaymentInfo(): Promise<void> {
        await this.confirmOrderBackButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
