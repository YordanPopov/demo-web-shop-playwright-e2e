import { test } from '@steps/Step.factory';
import { VALID_USERS, INVALID_DATA } from '@test-data/register.data';

test.describe('User registration - positive scenarios', () => {
    for (const user of VALID_USERS) {
        test(
            `Registration ${user.description}`,
            {
                tag: ['@register', '@positive', '@smoke'],
                annotation: [
                    { type: 'scenarioInfo', description: `Register ${user.description}` },
                    { type: 'firstName', description: user.data.firstName },
                    { type: 'lastName', description: user.data.lastName },
                    { type: 'email', description: user.data.email },
                    { type: 'password', description: user.data.password },
                ],
            },
            async ({ sharedSteps, signUpSteps }) => {
                await sharedSteps.navigateToSignUpPage();
                await signUpSteps.registerUser(user.data);
            }
        );
    }
});

test.describe('User registration - negative scenarios', () => {
    for (const invalid of INVALID_DATA) {
        test(
            `Attempt register with ${invalid.description}`,
            {
                tag: ['@register', '@negative'],
                annotation: [
                    {
                        type: 'scenarioInfo',
                        description: `Attempt register with ${invalid.description}`,
                    },
                    { type: 'firstName', description: invalid.data.firstName },
                    { type: 'lastName', description: invalid.data.lastName },
                    { type: 'email', description: invalid.data.email },
                    { type: 'password', description: invalid.data.password },
                ],
            },
            async ({ sharedSteps, signUpSteps }) => {
                await sharedSteps.navigateToSignUpPage();
                await signUpSteps.attemptRegisterUser(invalid.data, invalid.expectedErrors);
            }
        );
    }
});
