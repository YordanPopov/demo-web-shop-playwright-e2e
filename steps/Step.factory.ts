import { test as base } from '@playwright/test';

import SignUpSteps from '@steps/SignUp.steps';
import SharedSteps from '@steps/Shared.steps';

type FrameworkFixtures = {
    signUpSteps: SignUpSteps;

    sharedSteps: SharedSteps;
};

export const test = base.extend<FrameworkFixtures>({
    signUpSteps: async ({ page }, use) => {
        await use(new SignUpSteps(page));
    },

    sharedSteps: async ({ page }, use) => {
        await use(new SharedSteps(page));
    },
});

export { expect } from '@playwright/test';
