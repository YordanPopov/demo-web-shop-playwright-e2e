import { test } from '@steps/Step.factory';
import { VALID_LOGIN_USERS, INVALID_LOGIN_DATA } from '@test-data/logIn.data';

test.describe('Login user - positive scenarios', () => {
    for (const user of VALID_LOGIN_USERS) {
        test(
            `Login ${user.description}`,
            {
                tag: ['@login', '@positive', '@smoke'],
                annotation: [
                    { type: 'ScenarioInfo', description: `Login ${user.description}` },
                    { type: 'Email', description: user.data.email },
                    { type: 'Password', description: user.data.password },
                    { type: 'Remember me?', description: `${user.data.rememberMe}` },
                ],
            },
            async ({ sharedSteps, logInSteps }) => {
                await sharedSteps.navigateToLoginPage();
                await logInSteps.loginUser(user.data);
            }
        );
    }
});

test.describe('Login user - negative scenarios', () => {
    for (const testCase of INVALID_LOGIN_DATA) {
        test(
            `Login ${testCase.description}`,
            {
                tag: ['@login', '@negative'],
                annotation: [
                    { type: 'ScenarioInfo', description: `Login ${testCase.description}` },
                    { type: 'Email', description: testCase.data.email },
                    { type: 'Password', description: testCase.data.password },
                ],
            },
            async ({ sharedSteps, logInSteps }) => {
                await sharedSteps.navigateToLoginPage();

                await logInSteps.attemptLoginUser(testCase.data, testCase.expectedError);
            }
        );
    }
});
