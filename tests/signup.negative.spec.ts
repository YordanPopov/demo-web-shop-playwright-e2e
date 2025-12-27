import { test } from '@steps/Step.factory';
import { INVALID_DATA } from '@test-data/users.data';

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
