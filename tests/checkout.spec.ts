import { test } from '@steps/Step.factory';

import {
    CHECKOUT_USER,
    DEFAULT_PRODUCT,
    SAVED_ADDRESS_CHECKOUT_CASES,
} from '@test-data/checkout.data';

test.describe('Checkout - Saved Addresses', () => {
    test.beforeEach(async ({ sharedSteps, logInSteps, categorySteps, productSteps, cartSteps }) => {
        await sharedSteps.navigateToLoginPage();
        await logInSteps.loginUser(CHECKOUT_USER);

        await categorySteps.navigateToCategory(DEFAULT_PRODUCT.category);
        await categorySteps.openProductByTitle(DEFAULT_PRODUCT.productTitle);

        await productSteps.addProductToCart(DEFAULT_PRODUCT.qty);

        await cartSteps.openCart();
        await cartSteps.proceedToCheckout();
    });

    for (const testCase of SAVED_ADDRESS_CHECKOUT_CASES) {
        test(testCase.description, { tag: ['@checkout', '@saved'] }, async ({ checkoutSteps }) => {
            await checkoutSteps.completeCheckoutWithSavedAdresses(
                testCase.expectedPaymentInfo,
                testCase.expectedOrderSummary,
                testCase.shippingMethod,
                testCase.paymentMethod
            );
        });
    } 
});
