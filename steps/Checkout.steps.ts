import { expect, Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import {
    Address,
    PaymentMethod,
    ShippingMethod,
    BillingInfo,
    ShippingInfo,
    OrderSummary,
} from '@types';

export default class CheckoutSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCheckout(): Promise<void> {
        await this.checkoutPage.navigate();
        await expect(this.page).toHaveTitle(this.checkoutPage.TITLE);
    }

    async verifyStepCompleted(stepNumber: number): Promise<void> {
        const currentStep = await this.checkoutPage.getCurrentStep();
        expect(currentStep).toBeGreaterThan(stepNumber);
    }

    async verifyPaymentInfoMessage(expectedMessage: string): Promise<void> {
        const actualMessage = await this.checkoutPage.getPaymentInformation();
        expect(actualMessage).toContain(expectedMessage);
    }

    async completeBillingAddressWithExisting(addressLabel?: string): Promise<void> {
        if (addressLabel) {
            await this.checkoutPage.selectExistingBillingAddress(addressLabel);
        }

        await this.checkoutPage.continueToShippingAddress();
        await this.verifyStepCompleted(1);
    }

    async completeBillingAddressWithNew(billingAddress: Address): Promise<void> {
        await this.checkoutPage.fillNewBillingAddress(billingAddress);

        await this.checkoutPage.continueToShippingAddress();
        await this.verifyStepCompleted(1);
    }

    async completeShippingAddressWithExisting(addressLabel?: string): Promise<void> {
        if (addressLabel) {
            await this.checkoutPage.selectExistingShippingAddress(addressLabel);
        }

        await this.checkoutPage.continueToShippingMethod();
        await this.verifyStepCompleted(2);
    }

    async completeShippingAddressWithNew(shippingAddress: Address): Promise<void> {
        await this.checkoutPage.fillNewShippingAddress(shippingAddress);

        await this.checkoutPage.continueToShippingMethod();
        await this.verifyStepCompleted(2);
    }

    async completeShippingWithPickup(): Promise<void> {
        await this.checkoutPage.selectPickUpInStore();
        await this.checkoutPage.continueToShippingMethod();
        await this.verifyStepCompleted(2);
    }

    async completeShippingMethod(shippingMethod?: ShippingMethod): Promise<void> {
        if (shippingMethod) {
            await this.checkoutPage.selectShippingMethod(shippingMethod);
        }

        await this.checkoutPage.continueToPaymentMethod();
        await this.verifyStepCompleted(3);
    }

    async completePaymentMethod(paymentMethod?: PaymentMethod): Promise<void> {
        if (paymentMethod) {
            await this.checkoutPage.selectPaymentMethod(paymentMethod);
        }

        await this.checkoutPage.continueToPaymentInformation();
        await this.verifyStepCompleted(4);
    }

    async completePaymentInfo(expectedMessage: string): Promise<void> {
        await this.verifyPaymentInfoMessage(expectedMessage);
        await this.checkoutPage.continueToConfirmOrder();
        await this.verifyStepCompleted(5);
    }

    async completeOrder(): Promise<void> {
        await this.checkoutPage.confirmOrder();

        expect.soft(this.page).toHaveURL(/.*completed.*/);
    }

    async checkOrderSummary(expectedData: OrderSummary): Promise<void> {
        const orderSummary = await this.checkoutPage.verifyOrderSummary();

        if (expectedData.subtotal !== undefined) {
            expect.soft(orderSummary.subtotal).toBeCloseTo(expectedData.subtotal, 2);
        }

        if (expectedData.shipping !== undefined) {
            expect.soft(orderSummary.shipping).toBeCloseTo(expectedData.shipping, 2);
        }

        if (expectedData.paymentFee !== undefined) {
            expect.soft(orderSummary.paymentFee).toBeCloseTo(expectedData.paymentFee, 2);
        }

        if (expectedData.tax !== undefined) {
            expect.soft(orderSummary.tax).toBeCloseTo(expectedData.tax, 2);
        }

        if (expectedData.total !== undefined) {
            expect.soft(orderSummary.total).toBeCloseTo(expectedData.total, 2);
        }
    }

    async checkBillingInfo(expectedBillingInfo: BillingInfo): Promise<void> {
        const billingInfo = await this.checkoutPage.getBillingDisplayInfo();

        if (expectedBillingInfo.name !== undefined) {
            expect.soft(expectedBillingInfo.name).toBe(billingInfo.name);
        }

        if (expectedBillingInfo.email !== undefined) {
            expect.soft(expectedBillingInfo.email).toBe(billingInfo.email);
        }

        if (expectedBillingInfo.phone !== undefined) {
            expect.soft(expectedBillingInfo.phone).toBe(billingInfo.phone);
        }

        if (expectedBillingInfo.address !== undefined) {
            expect.soft(expectedBillingInfo.address).toBe(billingInfo.address);
        }

        if (expectedBillingInfo.country !== undefined) {
            expect.soft(expectedBillingInfo.country).toBe(billingInfo.country);
        }

        if (expectedBillingInfo.paymentMethod !== undefined) {
            expect.soft(expectedBillingInfo.paymentMethod).toBe(billingInfo.paymentMethod);
        }
    }

    async checkShippingInfo(expectedShippingInfo: ShippingInfo): Promise<void> {
        const shippingInfo = await this.checkoutPage.getShippingDisplayInfo();

        if (expectedShippingInfo.name !== undefined) {
            expect.soft(expectedShippingInfo.name).toBe(shippingInfo.name);
        }

        if (expectedShippingInfo.email !== undefined) {
            expect.soft(expectedShippingInfo.email).toBe(shippingInfo.email);
        }

        if (expectedShippingInfo.phone !== undefined) {
            expect.soft(expectedShippingInfo.phone).toBe(shippingInfo.phone);
        }

        if (expectedShippingInfo.address !== undefined) {
            expect.soft(expectedShippingInfo.address).toBe(shippingInfo.address);
        }

        if (expectedShippingInfo.country !== undefined) {
            expect.soft(expectedShippingInfo.country).toBe(shippingInfo.country);
        }

        if (expectedShippingInfo.shippingMethod !== undefined) {
            expect.soft(expectedShippingInfo.shippingMethod).toBe(shippingInfo.shippingMethod);
        }
    }

    async completeCheckoutWithSavedAdresses(
        expectedPaymentInfo: string,
        orderSummary: OrderSummary,
        shippingMethod?: ShippingMethod,
        paymentMethod?: PaymentMethod
    ): Promise<void> {
        await this.completeBillingAddressWithExisting();
        await this.completeShippingAddressWithExisting();
        await this.completeShippingMethod(shippingMethod);
        await this.completePaymentMethod(paymentMethod);
        await this.completePaymentInfo(expectedPaymentInfo);
        await this.checkOrderSummary(orderSummary);
        await this.completeOrder();
    }

    async completeCheckoutWithNewAddresses(
        billingAddress: Address,
        shippingAddress: Address,
        expectedPaymentInfo: string,
        orderSummary: OrderSummary,
        shippingMethod?: ShippingMethod,
        paymentMethod?: PaymentMethod
    ): Promise<void> {
        await this.completeBillingAddressWithNew(billingAddress);
        await this.completeShippingAddressWithNew(shippingAddress);
        await this.completeShippingMethod(shippingMethod);
        await this.completePaymentMethod(paymentMethod);
        await this.completePaymentInfo(expectedPaymentInfo);
        await this.checkOrderSummary(orderSummary);
        await this.completeOrder();
    }
}
