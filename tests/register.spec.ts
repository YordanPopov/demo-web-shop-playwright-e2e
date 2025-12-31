import { test } from '@steps/Step.factory';
import { VALID_USERS, INVALID_DATA } from '@test-data/register.data';

test.describe('User registration - positive scenarios', () => {
    for (const testCase of VALID_USERS) {
        test(
            `Registration ${testCase.description}`,
            {
                tag: ['@register', '@positive', '@smoke'],
                annotation: [
                    { type: 'scenarioInfo', description: `Register ${testCase.description}` },
                    { type: 'firstName', description: testCase.data.firstName },
                    { type: 'lastName', description: testCase.data.lastName },
                    { type: 'email', description: testCase.data.email },
                    { type: 'password', description: testCase.data.password },
                ],
            },
            async ({ sharedSteps, signUpSteps }) => {
                await sharedSteps.navigateToSignUpPage();
                await signUpSteps.registerUser(testCase.data);
            }
        );
    }
});

test.describe('User registration - negative scenarios', () => {
    for (const testCase of INVALID_DATA) {
        test(
            `Attempt register with ${testCase.description}`,
            {
                tag: ['@register', '@negative'],
                annotation: [
                    {
                        type: 'scenarioInfo',
                        description: `Attempt register with ${testCase.description}`,
                    },
                    { type: 'firstName', description: testCase.data.firstName },
                    { type: 'lastName', description: testCase.data.lastName },
                    { type: 'email', description: testCase.data.email },
                    { type: 'password', description: testCase.data.password },
                ],
            },
            async ({ sharedSteps, signUpSteps }) => {
                await sharedSteps.navigateToSignUpPage();
                await signUpSteps.attemptRegisterUser(testCase.data, testCase.expectedErrors);
            }
        );
    }
});
