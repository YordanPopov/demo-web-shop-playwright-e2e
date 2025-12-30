import { test as base } from '@playwright/test';

import SharedSteps from '@steps/Shared.steps';
import LogInSteps from '@steps/LogIn.steps';
import SignUpSteps from '@steps/SignUp.steps';

type FrameworkFixtures = {
    sharedSteps: SharedSteps;

    logInSteps: LogInSteps;

    signUpSteps: SignUpSteps;
};

export const test = base.extend<FrameworkFixtures>({
    sharedSteps: async ({ page }, use) => {
        await use(new SharedSteps(page));
    },

    logInSteps: async ({ page }, use) => {
        await use(new LogInSteps(page));
    },

    signUpSteps: async ({ page }, use) => {
        await use(new SignUpSteps(page));
    },
});

export { expect } from '@playwright/test';
