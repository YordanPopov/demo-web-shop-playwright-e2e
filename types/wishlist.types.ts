export interface WishlistProduct {
    title: string;
    expectedPrice?: number;
    initialQuantity?: number;
}

export interface AddToWishlistCase {
    description: string;
    productUrl: string;
    productTitle: string;
}

export interface QuantityUpdateCase {
    description: string;
    productTitle: string;
    newQuantity: number;
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
