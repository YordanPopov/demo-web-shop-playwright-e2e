export interface Address {
    fisrtName: string;
    lastName: string;
    email: string;
    company?: string;
    country: string;
    state?: string;
    city: string;
    address1: string;
    address2?: string;
    postalCode: string;
    phoneNumber: string;
    fax?: string;
}

export interface ShippingInfo {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    country?: string;
    shippingMethod?: string;
}

export interface BillingInfo {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    country?: string;
    paymentMethod?: string;
}

export interface OrderSummary {
    subtotal?: number;
    shipping?: number;
    paymentFee?: number;
    tax?: number;
    total?: number;
}

export type ShippingMethod = 'Ground (0.00)' | 'Next Day Air (0.00)' | '2nd Day Air (0.00)';
export type PaymentMethod =
    | 'Cash On Delivery (COD) (7.00)'
    | 'Check / Money Order (5.00)'
    | 'Credit Card'
    | 'Purchase Order';
