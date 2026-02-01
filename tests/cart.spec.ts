import { test } from '@steps/Step.factory';

import {
    CART_USER,
    ADD_TO_CART_CASES,
    UPDATE_CART_QUANTITY_CASES,
    CART_TOTAL_CASES,
} from '@test-data/cart.data';

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

test.describe('Update Cart Quantity', () => {
    test.beforeEach(async ({ sharedSteps, logInSteps }) => {
        await sharedSteps.navigateToLoginPage();
        await logInSteps.loginUser(CART_USER);
    });

    test.afterEach(async ({ cartSteps }) => {
        await cartSteps.clearCart();
    });

    for (const testCase of UPDATE_CART_QUANTITY_CASES) {
        test(
            testCase.description,
            {
                tag: ['@cart', '@update'],
                annotation: [
                    { type: 'Product', description: testCase.productTitle },
                    { type: 'InitialQuantity', description: `${testCase.initialQuantity}` },
                    { type: 'NewQuantity', description: `${testCase.newQuantity}` },
                    { type: 'ExpectedSubtotal', description: `${testCase.expectedSubtotal}` },
                ],
            },
            async ({ categorySteps, productSteps, cartSteps }) => {
                await categorySteps.navigateToCategory(testCase.category);
                await categorySteps.openProductByTitle(testCase.productTitle);

                await productSteps.addProductToCart(testCase.initialQuantity);

                await cartSteps.openCart();
                await cartSteps.verifyCartHasItems();
                await cartSteps.updateProductQuantity(testCase.productTitle, testCase.newQuantity);
                await cartSteps.verifyProductPrice(testCase.productTitle, testCase.expectedPrice);
                await cartSteps.verifyProductSubtotal(
                    testCase.productTitle,
                    testCase.expectedSubtotal
                );
            }
        );
    }
});

test.describe('Verify Cart Total', () => {
    test.beforeEach(async ({ sharedSteps, logInSteps }) => {
        await sharedSteps.navigateToLoginPage();
        await logInSteps.loginUser(CART_USER);
    });

    test.afterEach(async ({ cartSteps }) => {
        await cartSteps.clearCart();
    });

    for (const testCase of CART_TOTAL_CASES) {
        test(
            testCase.description,
            {
                tag: ['@cart', '@total'],
                annotation: [
                    { type: 'ProductsCount', description: `${testCase.products.length}` },
                    { type: 'ExpectedTotal', description: `${testCase.expectedTotal}` },
                ],
            },
            async ({ categorySteps, productSteps, cartSteps }) => {
                for (const product of testCase.products) {
                    await categorySteps.navigateToCategory(product.category);
                    await categorySteps.openProductByTitle(product.productTitle);

                    await productSteps.addProductToCart(product.quantity);
                }

                await cartSteps.openCart();
                await cartSteps.verifyCartItemsCount(testCase.products.length);
                await cartSteps.verifyCartSummary({
                    subtotal: testCase.expectedSubtotal,
                    total: testCase.expectedTotal,
                });
            }
        );
    }
});
