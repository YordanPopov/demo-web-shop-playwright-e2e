import { test } from '@steps/Step.factory';
import { VALID_LOGIN_USERS } from '@test-data/logIn.data';

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
            await sharedSteps.navigateToHomePage();
            await sharedSteps.homePage.navigateToLogin();

            await logInSteps.login(user.data);
        }
    );
}
