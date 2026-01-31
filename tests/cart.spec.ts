import { test } from '@steps/Step.factory';

import { CART_USER, ADD_TO_CART_CASES } from '@test-data/cart.data';

test.describe('Add to Cart', () => {
    test.beforeEach(async ({ sharedSteps, logInSteps }) => {
        await sharedSteps.navigateToLoginPage();
        await logInSteps.loginUser(CART_USER);
    });

    test.afterEach(async ({ cartSteps }) => {
        await cartSteps.clearCart();
    });

    for (const testCase of ADD_TO_CART_CASES) {
        test(
            testCase.description,
            {
                tag: ['@cart', '@add'],
                annotation: [
                    { type: 'Category', description: testCase.category },
                    { type: 'Product', description: testCase.productTitle },
                    { type: 'Quantity', description: `${testCase.quantity}` },
                    { type: 'ExpectedPrice', description: `${testCase.expectedPrice}` },
                ],
            },
            async ({ categorySteps, productSteps, cartSteps }) => {
                await categorySteps.navigateToCategory(testCase.category);
                await categorySteps.openProductByTitle(testCase.productTitle);

                await productSteps.addProductToCart(testCase.quantity);

                await cartSteps.openCart();
                await cartSteps.verifyCartHasItems();
                await cartSteps.verifyProductQuantity(testCase.productTitle, testCase.quantity);
                await cartSteps.verifyProductSubtotal(
                    testCase.productTitle,
                    testCase.expectedPrice
                );
            }
        );
    }
});
