import { test as base } from '@playwright/test';

import SharedSteps from '@steps/Shared.steps';
import LogInSteps from '@steps/LogIn.steps';
import SignUpSteps from '@steps/SignUp.steps';
import SearchSteps from '@steps/Search.steps';
import CategorySteps from '@steps/Category.steps';

type FrameworkFixtures = {
    sharedSteps: SharedSteps;

    logInSteps: LogInSteps;

    signUpSteps: SignUpSteps;

    searchSteps: SearchSteps;

    categorySteps: CategorySteps;
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

    searchSteps: async ({ page }, use) => {
        await use(new SearchSteps(page));
    },

    categorySteps: async ({ page }, use) => {
        await use(new CategorySteps(page));
    },
});