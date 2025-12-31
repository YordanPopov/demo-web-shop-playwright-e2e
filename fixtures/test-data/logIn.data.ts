import { invalidLoginTestCase, LoginTestCase } from '@types';

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

export const INVALID_LOGIN_DATA: invalidLoginTestCase[] = [
    {
        description: 'with empty fields.',
        data: {
            email: '',
            password: '',
        },
        expectedError: {
            global: 'Login was unsuccessful. Please correct the errors and try again.\nNo customer account found',
        },
    },
    {
        description: 'with empty email field.',
        data: {
            email: '',
            password: 'P@$$1234',
        },
        expectedError: {
            global: 'Login was unsuccessful. Please correct the errors and try again.\nNo customer account found',
        },
    },
    {
        description: 'with empty password field.',
        data: {
            email: 'tester_yo@email.com',
            password: '',
        },
        expectedError: {
            global: 'Login was unsuccessful. Please correct the errors and try again.\nThe credentials provided are incorrect',
        },
    },
    {
        description: 'with wrong password.',
        data: {
            email: 'tester_yo@email.com',
            password: 'wr0ngP@ssw0rd',
        },
        expectedError: {
            global: 'Login was unsuccessful. Please correct the errors and try again.\nThe credentials provided are incorrect',
        },
    },
];
