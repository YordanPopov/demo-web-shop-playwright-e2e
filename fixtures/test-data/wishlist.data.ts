import type { AddToWishlistCase, LogInData, UpdateQuantityCase } from '@types';

export const WISHLIST_USER: LogInData = {
    email: 'tester_yo@email.com',
    password: 'test1234',
};

export const ADD_TO_WISHLIST_CASES: AddToWishlistCase[] = [
    {
        description: "Add '3rd Album' from Digital-downloads category",
        category: 'digital-downloads',
        productTitle: '3rd Album',
        navigateBy: 'Title',
    },
    {
        description: "Add 'Music 2' from Digital-downloads category",
        category: 'digital-downloads',
        productTitle: 'Music 2',
        navigateBy: 'Title',
    },
    {
        description: "Add 'Smartphone' from Cell phones category",
        category: 'cell-phones',
        productTitle: 'Smartphone',
        navigateBy: 'Title',
    },
    {
        description: "Add 'Phone Cover' from Cell phones category",
        category: 'cell-phones',
        productTitle: 'Phone Cover',
        navigateBy: 'Title',
    },
    {
        description: "Add 'Black & White Diamond Heart' from Jewerly category",
        category: 'jewelry',
        productTitle: 'Black & White Diamond Heart',
        navigateBy: 'Title',
    },
    {
        description:
            "Add '50's Rockabilly Polka Dot Top JR Plus Size' from Apparel & Shoes category",
        category: 'apparel-shoes',
        productTitle: "50's Rockabilly Polka Dot Top JR Plus Size",
        navigateBy: 'Title',
    },
    {
        description: "Add 'Blue and green Sneaker' from Apparel & Shoes category",
        category: 'apparel-shoes',
        productTitle: 'Blue and green Sneaker',
        navigateBy: 'Title',
    },
];

export const QUANTITY_UPDATE_CASES: UpdateQuantityCase[] = [
    {
        description: "Update '3rd Album' quantity to 2",
        category: 'digital-downloads',
        productTitle: '3rd Album',
        initialQty: 1,
        newQuantity: 2,
        expectedPrice: 1.0,
        expectedSubtotal: 2.0,
    },
    {
        description: "Update 'Music 2' quantity to 5",
        category: 'digital-downloads',
        productTitle: 'Music 2',
        initialQty: 1,
        newQuantity: 5,
        expectedPrice: 10.0,
        expectedSubtotal: 50.0,
    },
];
