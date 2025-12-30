import { LoginTestCase } from '@types';

export const VALID_LOGIN_USERS: LoginTestCase[] = [
    {
        description: 'with valid user without remember me.',
        data: {
            email: 'tester_yo@email.com',
            password: 'test1234',
            rememberMe: false,
        },
    },
    {
        description: 'with valid user with remember me.',
        data: {
            email: 'tester_yo@email.com',
            password: 'test1234',
            rememberMe: true,
        },
    },
    {
        description: 'with valid user without remember me option.',
        data: {
            email: 'tester_yo@email.com',
            password: 'test1234',
        },
    },
];
