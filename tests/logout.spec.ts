import { test } from '@steps/Step.factory';
import { VALID_LOGIN_USERS } from '@test-data/logIn.data';

test.describe('Logout user', () => {
    for (const user of VALID_LOGIN_USERS) {
        test(
            `Logout ${user.description}`,
            { tag: ['@logout', '@positive', '@smoke'] },
            async ({ sharedSteps, logInSteps }) => {
                await sharedSteps.navigateToHomePage();
                await sharedSteps.navigateToLoginPage();

                await logInSteps.loginUser(user.data);

                await sharedSteps.logout();
            }
        );
    }
});
