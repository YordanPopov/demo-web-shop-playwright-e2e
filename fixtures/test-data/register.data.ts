import { faker } from '@faker-js/faker';
import type { RegistrationData, RegisterTestCase, InvalidRegisterTestCase } from '@types';

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
        gender: faker.helpers.arrayElement(['male', 'female']),
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

export const VALID_USERS: RegisterTestCase[] = [
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
    {
        description: 'bulgarian user with Cyrillic characters',
        data: {
            gender: 'male',
            firstName: 'Иван',
            lastName: 'Иванов',
            email: generateUniqueEmail(),
            password: 'Парола123!',
            confirmPassword: 'Парола123!',
        },
    },
    {
        description: 'german user with umlauts',
        data: generateUser({ gender: 'male', firstName: 'Müller', lastName: 'Schröder' }),
    },
    {
        description: 'french user with accents',
        data: generateUser({ firstName: 'François', lastName: 'Bérénice' }),
    },
];

export const INVALID_DATA: InvalidRegisterTestCase[] = [
    {
        description: 'blank fields.',
        data: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        expectedErrors: {
            firstName: 'First name is required.',
            lastName: 'Last name is required.',
            email: 'Email is required.',
            password: 'Password is required.',
            confirmPassword: 'Password is required.',
        },
    },
    {
        description: 'blank first name field.',
        data: {
            firstName: '',
            lastName: 'test',
            email: 'test@email.com',
            password: 'p@ass1234',
            confirmPassword: 'p@ass1234',
        },
        expectedErrors: {
            firstName: 'First name is required.',
        },
    },
    {
        description: 'blank last name field.',
        data: {
            firstName: 'test',
            lastName: '',
            email: 'test@email.com',
            password: 'p@ass1234',
            confirmPassword: 'p@ass1234',
        },
        expectedErrors: {
            lastName: 'Last name is required.',
        },
    },
    {
        description: 'blank email field.',
        data: {
            firstName: 'test',
            lastName: 'test',
            email: '',
            password: 'p@ass1234',
            confirmPassword: 'p@ass1234',
        },
        expectedErrors: {
            email: 'Email is required.',
        },
    },
    {
        description: 'invalid email format - missing domain',
        data: {
            firstName: 'test',
            lastName: 'test',
            email: 'tester@',
            password: 'p@ss1234',
            confirmPassword: 'p@ss1234',
        },
        expectedErrors: {
            email: 'Wrong email',
        },
    },
    {
        description: 'blank password fields',
        data: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@email.com',
            password: '',
            confirmPassword: '',
        },
        expectedErrors: {
            password: 'Password is required.',
            confirmPassword: 'Password is required.',
        },
    },
    {
        description: 'mismatched password.',
        data: {
            firstName: '',
            lastName: 'test',
            email: 'test@email.com',
            password: 'p@ass1234',
            confirmPassword: 'p@ass12345',
        },
        expectedErrors: {
            confirmPassword: 'The password and confirmation password do not match.',
        },
    },
    {
        description: 'too short password',
        data: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@email.com',
            password: '123',
            confirmPassword: '123',
        },
        expectedErrors: {
            password: 'The password should have at least 6 characters.',
        },
    },
];
