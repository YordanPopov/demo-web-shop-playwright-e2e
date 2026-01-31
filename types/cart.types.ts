import { CategorySlug } from '@types';

export interface AddToCartTestCase {
    description: string;
    category: CategorySlug;
    productTitle: string;
    quantity: number;
    expectedPrice?: number;
}
