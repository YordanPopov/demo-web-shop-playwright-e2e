import { LogInData, AddToCartTestCase } from '@types';

export const CART_USER: LogInData = {
    email: 'tester_yo@email.com',
    password: 'test1234',
};

export const ADD_TO_CART_CASES: AddToCartTestCase[] = [
    {
        description: "Add 'Computing and Internet' book to cart",
        category: 'books',
        productTitle: 'Computing and Internet',
        quantity: 1,
        expectedPrice: 10.0,
    },
    {
        description: "Add two '14.1-inch Laptop' to cart",
        category: 'notebooks',
        productTitle: '14.1-inch Laptop',
        quantity: 2,
        expectedPrice: 3180.0,
    },
    {
        description: "Add 'TCP Instructor Led Training' to cart",
        category: 'accessories',
        productTitle: 'TCP Instructor Led Training',
        quantity: 1,
        expectedPrice: 9000.0,
    },
    {
        description: "Add five 'Smartphone' to cart",
        category: 'cell-phones',
        productTitle: 'Smartphone',
        quantity: 5,
        expectedPrice: 500,
    },
    {
        description: "Add a hundred 'Blue Jeans' to cart",
        category: 'apparel-shoes',
        productTitle: 'Blue Jeans',
        quantity: 100,
        expectedPrice: 100.0,
    },
    {
        description: "Add a thousand '3rd Album' to cart",
        category: 'digital-downloads',
        productTitle: '3rd Album',
        quantity: 1000,
        expectedPrice: 1000.0,
    },
    {
        description: "Add a ten thousand milion 'Black & White Diamond Heart' to cart",
        category: 'jewelry',
        productTitle: 'Black & White Diamond Heart',
        quantity: 10_000,
        expectedPrice: 1_300_000.0,
    },
];
