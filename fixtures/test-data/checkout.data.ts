import type {
    Address,
    BillingInfo,
    ShippingInfo,
    OrderSummary,
    ShippingMethod,
    PaymentMethod,
    CategorySlug,
} from '@types';

interface LoginData {
    email: string;
    password: string;
}

interface DefaultProduct {
    category: CategorySlug;
    productTitle: string;
    qty: number;
}

export interface CheckoutCase {
    description: string;
    billingAddress: Address;
    shippingAddress: Address;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    expectedPaymentInfo: string;
    expectedOrderSummary: OrderSummary;
    expectedBillingInfo: BillingInfo;
    expectedShippingInfo: ShippingInfo;
}

export interface CheckoutWithSavedAddressesCase {
    description: string;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    expectedPaymentInfo: string;
    expectedOrderSummary: OrderSummary;
}

export const CHECKOUT_USER: LoginData = {
    email: 'tester_yo@email.com',
    password: 'test1234',
};

export const DEFAULT_PRODUCT: DefaultProduct = {
    category: 'books',
    productTitle: 'Computing and Internet',
    qty: 1,
};

export const US_BILLING_ADDRESS: Address = {
    fisrtName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Acme corp',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    postalCode: '10001',
    phoneNumber: '+1 212-555-0100',
};

export const US_SHIPPING_ADDRESS: Address = {
    fisrtName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    address1: '456 Sunset Blvd',
    postalCode: '90028',
    phoneNumber: '+1 323-555-0199',
};

export const EU_BILLING_ADDRESS: Address = {
    fisrtName: 'Yordan',
    lastName: 'Popov',
    email: 'yordan.popov@example.com',
    company: 'KAI',
    country: 'Bulgaria',
    state: 'Razgrad',
    city: 'Isperih',
    address1: 'ul. Ahinora1',
    postalCode: '7400',
    phoneNumber: '+359 2 000 0001',
};

export const EU_SHIPPING_ADDRESS: Address = {
    fisrtName: 'Maria',
    lastName: 'Petrova',
    email: 'maria.petrova@example.com',
    country: 'Bulgaria',
    city: 'Sofia',
    address1: 'ul. Vitosha 1',
    postalCode: '1000',
    phoneNumber: '+359 2 000 0001',
};

export const SAVED_ADDRESS_CHECKOUT_CASES: CheckoutWithSavedAddressesCase[] = [
    {
        description: 'Checkout with saved addresses | Ground shipping | Cash On Delivery',
        shippingMethod: 'Ground (0.00)',
        paymentMethod: 'Cash On Delivery (COD) (7.00)',
        expectedPaymentInfo: 'You will pay by COD',
        expectedOrderSummary: {
            subtotal: 10.0,
            shipping: 0,
            paymentFee: 7.0,
            total: 17.0,
        },
    },
    {
        description: 'Checkout with saved addresses | Next Day Air | Cash On Delivery',
        shippingMethod: 'Next Day Air (0.00)',
        paymentMethod: 'Cash On Delivery (COD) (7.00)',
        expectedPaymentInfo: 'You will pay by COD',
        expectedOrderSummary: {
            subtotal: 10.0,
            shipping: 0,
            paymentFee: 7.0,
            total: 17.0,
        },
    },
    {
        description: 'Checkout with saved addresses | 2nd Day Air | Cash On Delivery',
        shippingMethod: '2nd Day Air (0.00)',
        paymentMethod: 'Cash On Delivery (COD) (7.00)',
        expectedPaymentInfo: 'You will pay by COD',
        expectedOrderSummary: {
            subtotal: 10.0,
            shipping: 0,
            paymentFee: 7.0,
            total: 17.0,
        },
    },
    {
        description: 'Checkout with saved addresses | 2nd Day Air | Check / Money Order',
        shippingMethod: '2nd Day Air (0.00)',
        paymentMethod: 'Check / Money Order (5.00)',
        expectedPaymentInfo: "Mail Personal or Business Check, Cashier's Check or money order to:",
        expectedOrderSummary: {
            subtotal: 10.0,
            shipping: 0,
            paymentFee: 5.0,
            total: 15.0,
        },
    },
];
