import { faker } from '@faker-js/faker';

export interface RegistrationData {
    gender?: 'male' | 'female';
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserTestCase {
    description: string;
    data: RegistrationData;
}

function generateUniqueEmail(): string {
    const timeStamp = Date.now();
    const randomString = faker.string.alphanumeric(5);
    return `test.${timeStamp}.${randomString}@example.com`;
}

function generateValidPassword(): string {
    return faker.internet.password({
        length: 10,
        memorable: true,
        pattern: /[A-Za-z0-9]/,
        prefix: 'P@$$',
    });
}

function generateUser(overrides?: Partial<RegistrationData>): RegistrationData {
    const password = generateValidPassword();

    const user: RegistrationData = {
        gender: faker.helpers.arrayElement(['male', 'male']),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: generateUniqueEmail(),
        password: password,
        confirmPassword: password,
    };

    return {
        ...user,
        ...overrides,
    };
}

export const VALID_USERS: UserTestCase[] = [
    {
        description: 'valid male user with generated data',
        data: generateUser({ gender: 'male' }),
    },
    {
        description: 'valid female user with generated data',
        data: generateUser({ gender: 'female' }),
    },
    {
        description: 'valid user without gender',
        data: generateUser({ gender: undefined }),
    },
    {
        description: 'valid user with static reliable data',
        data: generateUser({ gender: 'male', firstName: 'John', lastName: 'Doe' }),
    },
];
