import { test } from '@steps/Step.factory';
import { VALID_USERS } from '@test-data/users.data';

for (const user of VALID_USERS) {
    test(
        `Registration ${user.description}`,
        {
            tag: ['@register', '@positive'],
            annotation: [
                { type: 'scenarioInfo', description: `Register ${user.data}` },
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
