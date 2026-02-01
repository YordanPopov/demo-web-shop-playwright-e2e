import { CategorySlug } from '@types';

export interface AddToCartTestCase {
    description: string;
    category: CategorySlug;
    productTitle: string;
    quantity: number;
    expectedPrice?: number;
}

export interface UpdateCartQuantityTestCase {
    description: string;
    category: CategorySlug;
    productTitle: string;
    initialQuantity: number;
    newQuantity: number;
    expectedPrice: number;
    expectedSubtotal: number;
}

export interface CartTotalTestCase {
    description: string;
    products: Array<{
        category: CategorySlug;
        productTitle: string;
        quantity: number;
        expectedPrice: number;
    }>;
    expectedSubtotal: number;
    expectedTotal: number;
}
