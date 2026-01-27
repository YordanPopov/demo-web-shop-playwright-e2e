import { test } from '@steps/Step.factory';

import {
    WISHLIST_USER,
    ADD_TO_WISHLIST_CASES,
    QUANTITY_UPDATE_CASES,
} from '@fixtures/test-data/wishlist.data';

test.describe('Add to Wishlist', () => {
    test.beforeEach(async ({ sharedSteps, logInSteps }) => {
        await sharedSteps.navigateToLoginPage();
        await logInSteps.loginUser(WISHLIST_USER);
    });

    test.afterEach(async ({ wishlistSteps }) => {
        await wishlistSteps.clearWishlist();
        await wishlistSteps.verifyWishlistIsEmpty();
    });

    for (const testCase of ADD_TO_WISHLIST_CASES) {
        test(
            testCase.description,
            {
                tag: ['@wishlist', '@add'],
                annotation: [
                    { type: 'Category', description: testCase.category },
                    { type: 'Product', description: testCase.productTitle },
                    { type: 'NavigationMethod', description: testCase.navigateBy },
                ],
            },
            async ({ categorySteps, productSteps, wishlistSteps }) => {
                await categorySteps.navigateToCategory(testCase.category);
                await categorySteps.openProductByTitle(testCase.productTitle);

                await productSteps.addProductToWishlist();

                await wishlistSteps.openWishlist();
                await wishlistSteps.verifyWishlistHasItems();
                await wishlistSteps.verifyProductInWishlist(testCase.productTitle);
            }
        );
    }
});

test.describe('Update Wishlist Quantity', () => {
    test.beforeEach(async ({ sharedSteps, logInSteps }) => {
        await sharedSteps.navigateToLoginPage();
        await logInSteps.loginUser(WISHLIST_USER);
    });

    test.afterEach(async ({ wishlistSteps }) => {
        await wishlistSteps.clearWishlist();
    });

    for (const testCase of QUANTITY_UPDATE_CASES) {
        test(
            testCase.description,
            {
                tag: ['@wishlist', '@update', '@quantity'],
                annotation: [
                    { type: 'Product', description: testCase.productTitle },
                    { type: 'InitialQuantity', description: `${testCase.initialQty}` },
                    { type: 'NewQuantity', description: `${testCase.newQuantity}` },
                    { type: 'ExpectedSubtotal', description: `${testCase.expectedSubtotal}` },
                ],
            },
            async ({ categorySteps, productSteps, wishlistSteps }) => {
                await categorySteps.navigateToCategory(testCase.category);
                await categorySteps.openProductByTitle(testCase.productTitle);

                await productSteps.addProductToWishlist();

                await wishlistSteps.openWishlist();
                await wishlistSteps.verifyWishlistHasItems();
                await wishlistSteps.updateProductQuantity(
                    testCase.productTitle,
                    testCase.newQuantity
                );
                await wishlistSteps.verifySubtotal(
                    testCase.productTitle,
                    testCase.expectedSubtotal
                );
            }
        );
    }
});
