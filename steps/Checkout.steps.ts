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

    async completeShippingWishPickup(): Promise<void> {
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
}
