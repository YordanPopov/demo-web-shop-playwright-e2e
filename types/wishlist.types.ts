import { CategorySlug } from './categories.types';

export interface WishlistProduct {
    title: string;
    expectedPrice?: number;
    initialQuantity?: number;
}

export interface AddToWishlistCase {
    description: string;
    category: CategorySlug;
    productTitle: string;
    productIndex?: number;
    navigateBy: 'Title' | 'Index';
}

export interface UpdateQuantityCase {
    description: string;
    category: CategorySlug;
    productTitle: string;
    initialQty: number;
    newQuantity: number;
    expectedPrice: number;
    expectedSubtotal?: number;
}

export interface RemoveProductCase {
    description: string;
    productTitle: string;
    removeMethod: 'byTitle' | 'byIndex';
    index?: number;
}

export interface ValidationTestCase {
    description: string;
    validationType: 'price' | 'subtotal' | 'total' | 'badge';
    productIndex?: number;
    expectedValue?: number;
}
