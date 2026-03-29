import type {
    Address,
    BillingInfo,
    ShippingInfo,
    OrderSummary,
    ShippingMethod,
    PaymentMethod,
} from '@types';

interface LoginData {
    email: string;
    password: string;
}

export const CHECKOUT_USER: LoginData = {
    email: 'tester_yo@email.com',
    password: 'test1234',
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
