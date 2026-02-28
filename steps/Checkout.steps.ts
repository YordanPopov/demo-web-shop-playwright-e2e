import { expect, Page } from '@playwright/test';

/* Page objects */
import PageFactory from '@pages/Page.factory';

/* Types */
import { Address, PaymentMethod, ShippingMethod } from '@types';

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

        expect(this.page).toHaveURL(/.*completed.*/);
    }

    async checkOrderSummary(expectedData: {
        subtotal?: number;
        shipping?: number;
        paymentFee?: number;
        tax?: number;
        total?: number;
    }): Promise<void> {
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

    async checkBillingInfo(expectedData: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        country?: string;
        paymentMethod?: string;
    }): Promise<void> {
        const billingInfo = await this.checkoutPage.getBillingDisplayInfo();

        if (expectedData.name !== undefined) {
            expect.soft(expectedData.name).toBe(billingInfo.name);
        }

        if (expectedData.email !== undefined) {
            expect.soft(expectedData.email).toBe(billingInfo.email);
        }

        if (expectedData.phone !== undefined) {
            expect.soft(expectedData.phone).toBe(billingInfo.phone);
        }

        if (expectedData.address !== undefined) {
            expect.soft(expectedData.address).toBe(billingInfo.address);
        }

        if (expectedData.country !== undefined) {
            expect.soft(expectedData.country).toBe(billingInfo.country);
        }

        if (expectedData.paymentMethod !== undefined) {
            expect.soft(expectedData.paymentMethod).toBe(billingInfo.paymentMethod);
        }
    }

    async checkShippingInfo(expectedData: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        country?: string;
        shippingMethod?: string;
    }): Promise<void> {
        const shippingInfo = await this.checkoutPage.getShippingDisplayInfo();

        if (expectedData.name !== undefined) {
            expect.soft(expectedData.name).toBe(shippingInfo.name);
        }

        if (expectedData.email !== undefined) {
            expect.soft(expectedData.email).toBe(shippingInfo.email);
        }

        if (expectedData.phone !== undefined) {
            expect.soft(expectedData.phone).toBe(shippingInfo.phone);
        }

        if (expectedData.address !== undefined) {
            expect.soft(expectedData.address).toBe(shippingInfo.address);
        }

        if (expectedData.country !== undefined) {
            expect.soft(expectedData.country).toBe(shippingInfo.country);
        }

        if (expectedData.shippingMethod !== undefined) {
            expect.soft(expectedData.shippingMethod).toBe(shippingInfo.shippingMethod);
        }
    }
}
