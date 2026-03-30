import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

/* Types */
import { Address, ShippingMethod, PaymentMethod } from '@types';

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
        this.shippingMethodRadios = page.locator('.shipping-method');
        this.shippingMethodBackButton = page.locator('#shipping-method-buttons-container p a');
        this.shippingMethodContinueButton = page.locator(
            '#shipping-method-buttons-container input[type="button"]'
        );

        /* Step 4: Payment method */
        this.paymentMethodSection = page.locator('#checkout-step-payment-method');
        this.paymentMethodRadios = page.locator('.payment-method');
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
    async selectNewBillingAddress(): Promise<void> {
        await this.billingAddressSelect.selectOption({ label: 'New Address' });
    }

    async selectExistingBillingAddress(addressText: string): Promise<void> {
        await this.billingAddressSelect.selectOption({ label: addressText });
    }

    async fillNewBillingAddress(billingAddress: Address): Promise<void> {
        await this.selectNewBillingAddress();

        await this.billingFirstName.fill(billingAddress.fisrtName);
        await this.billingLastName.fill(billingAddress.lastName);
        await this.billingEmail.fill(billingAddress.email);

        if (billingAddress.company) {
            this.billingCompany.fill(billingAddress.company);
        }

        await this.billingCountry.selectOption({ label: billingAddress.country });

        if (billingAddress.state) {
            await this.billingState.selectOption({ label: billingAddress.state });
        }

        await this.billingCity.fill(billingAddress.city);
        await this.billingAddress1.fill(billingAddress.address1);

        if (billingAddress.address2) {
            await this.billingAddress2.fill(billingAddress.address2);
        }

        await this.billingPostalCode.fill(billingAddress.postalCode);
        await this.billingPhoneNumber.fill(billingAddress.phoneNumber);

        if (billingAddress.fax) {
            await this.billingFaxNumber.fill(billingAddress.fax);
        }
    }

    async continueToShippingAddress(): Promise<void> {
        await this.billingContinueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /* Step 2: Shipping address methods */
    async selectNewShippingAddress(): Promise<void> {
        await this.shippingAddressSelect.selectOption({ label: 'New Address' });
    }

    async selectExistingShippingAddress(addressText: string): Promise<void> {
        await this.shippingAddressSelect.selectOption({ label: addressText });
    }

    async fillNewShippingAddress(shippingAddress: Address): Promise<void> {
        await this.selectNewShippingAddress();

        await this.shippingFirstName.fill(shippingAddress.fisrtName);
        await this.shippingLastName.fill(shippingAddress.lastName);
        await this.shippingEmail.fill(shippingAddress.email);

        if (shippingAddress.company) {
            this.shippingCompany.fill(shippingAddress.company);
        }

        await this.shippingCountry.selectOption({ label: shippingAddress.country });

        if (shippingAddress.state) {
            await this.shippingState.selectOption({ label: shippingAddress.state });
        }

        await this.shippingCity.fill(shippingAddress.city);
        await this.shippingAddress1.fill(shippingAddress.address1);

        if (shippingAddress.address2) {
            await this.shippingAddress2.fill(shippingAddress.address2);
        }

        await this.shippingPostalCode.fill(shippingAddress.postalCode);
        await this.shippingPhoneNumber.fill(shippingAddress.phoneNumber);

        if (shippingAddress.fax) {
            await this.shippingFaxNumber.fill(shippingAddress.fax);
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
    async selectShippingMethod(methodName: ShippingMethod): Promise<void> {
        const label = this.page.locator(`.method-name label:has-text("${methodName}")`);
        const forAttr = await label.getAttribute('for');
        await this.shippingMethodRadios.locator(`#${forAttr}`).check();
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
    async selectPaymentMethod(methodName: PaymentMethod): Promise<void> {
        const label = this.page.locator(`.method-name label:has-text("${methodName}")`);
        const forAttr = await label.getAttribute('for');
        await this.paymentMethodRadios.locator(`#${forAttr}`).check();
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
        const paymentInfo = (await this.paymentInfoText.nth(0).textContent())?.trim();
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

    /* Order summary method */
    async getOrderSubtotal(): Promise<number> {
        const subtotalText = await this.subTotalValue.textContent();
        return parseFloat(subtotalText.replace(/[^\d.]/g, '') || '0');
    }

    async getOrderShippingCost(): Promise<number> {
        const shippingCostText = await this.shippingCostValue.textContent();
        return parseFloat(shippingCostText.replace(/[^\d.]/g, '') || '0');
    }

    async getOrderPaymentFee(): Promise<number> {
        const paymentFeeText = await this.paymentFeeValue.textContent();
        return parseFloat(paymentFeeText.replace(/[^\d.]/g, '') || '0');
    }

    async getOrderTax(): Promise<number> {
        const orderTaxText = await this.taxValue.textContent();
        return parseFloat(orderTaxText.replace(/[^\d.]/g, '') || '0');
    }

    async getOrderTotal(): Promise<number> {
        const orderTotalText = await this.orderTotalValue.textContent();
        return parseFloat(orderTotalText.replace(/[^\d.]/g, '') || '0');
    }

    async verifyOrderSummary(): Promise<{
        subtotal: number;
        shipping: number;
        paymentFee: number;
        tax: number;
        total: number;
    }> {
        return {
            subtotal: await this.getOrderSubtotal(),
            shipping: await this.getOrderShippingCost(),
            paymentFee: await this.getOrderPaymentFee(),
            tax: await this.getOrderTax(),
            total: await this.getOrderTotal(),
        };
    }

    /* Billing & Shipping info dispaly methods*/
    async getBillingDisplayInfo(): Promise<{
        name: string;
        email: string;
        phone: string;
        address: string;
        country: string;
        paymentMethod: string;
    }> {
        return {
            name: (await this.billingInfoName.textContent())?.trim() || '',
            email: (await this.billingInfoEmail.textContent())?.replace('Email:', '').trim() || '',
            phone: (await this.billingInfoPhone.textContent())?.replace('Phone:', '').trim() || '',
            address: (await this.billingInfoAddress.textContent())?.trim() || '',
            country: (await this.billingInfoCountry.textContent())?.trim() || '',
            paymentMethod: (await this.billingPaymentMethod.textContent())?.trim() || '',
        };
    }

    async getShippingDisplayInfo(): Promise<{
        name: string;
        email: string;
        phone: string;
        address: string;
        country: string;
        shippingMethod: string;
    }> {
        return {
            name: (await this.shippingInfoName.textContent())?.trim() || '',
            email: (await this.shippingInfoEmail.textContent())?.replace('Email:', '').trim() || '',
            phone: (await this.shippingInfoPhone.textContent())?.replace('Phone:', '').trim() || '',
            address: (await this.shippingInfoAddress.textContent())?.trim() || '',
            country: (await this.shippingInfoCountry.textContent())?.trim() || '',
            shippingMethod: (await this.shippingMethodDisplay.textContent())?.trim() || '',
        };
    }

    /* Complete checkoutflow */
    async completeCheckoutWithExistingAddresses(
        shippingMethod: ShippingMethod,
        paymentMethod: PaymentMethod
    ): Promise<void> {
        await this.continueToShippingAddress();

        await this.continueToShippingMethod();

        await this.selectShippingMethod(shippingMethod);
        await this.continueToPaymentMethod();

        await this.selectPaymentMethod(paymentMethod);
        await this.continueToPaymentInformation();

        await this.continueToConfirmOrder();

        await this.confirmOrder();
    }

    async completeCheckoutWithNewAddresses(
        billingAddress: Address,
        shippingAddress: Address,
        shippingMethod: ShippingMethod,
        paymentMethod: PaymentMethod
    ): Promise<void> {
        await this.fillNewBillingAddress(billingAddress);
        await this.continueToShippingAddress();

        await this.fillNewShippingAddress(shippingAddress);
        await this.continueToShippingMethod();

        await this.selectShippingMethod(shippingMethod);
        await this.continueToPaymentMethod();

        await this.selectPaymentMethod(paymentMethod);
        await this.continueToPaymentInformation();

        await this.continueToConfirmOrder();

        await this.confirmOrder();
    }

    /* Validation methods */
    async isStepVisible(stepNumber: number): Promise<boolean> {
        const stepIDs = [
            '#opc-billing',
            '#opc-shipping',
            '#opc-shipping_method',
            '#opc-payment_method',
            '#opc-payment_info',
            '#opc-confirm_order',
        ];

        if (stepNumber < 1 || stepNumber > 6) {
            throw new Error('Step must be between 1 and 6');
        }

        const step = this.page.locator(stepIDs[stepNumber - 1]);
        return await step.locator('.step').isVisible();
    }

    async getCurrentStep(): Promise<number> {
        for (let i = 1; i <= 6; i++) {
            if (await this.isStepVisible(i)) {
                return i;
            }
        }

        return 0;
    }
}
