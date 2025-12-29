export interface RegistrationData {
    gender?: 'male' | 'female';
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface InvalidRegistrationData {
    data: RegistrationData;
    expectedErrors?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
}

export interface RegisterValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface RegisterTestCase {
    description: string;
    data: RegistrationData;
}

export interface InvalidRegisterTestCase {
    description: string;
    data: RegistrationData;
    expectedErrors?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
}

export type RegisterExpectedErrorFields = keyof RegisterValidationErrors;
