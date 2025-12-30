import { Page, expect } from '@playwright/test';

import PageFactory from '@pages/Page.factory';

export default class SharedSteps extends PageFactory {
    constructor(page: Page) {
        super(page);
    }

    async navigateToHomePage(): Promise<void> {
        await this.homePage.navigate();

        await expect(this.page).toHaveTitle(this.homePage.TITLE);
    }

    async navigateToSignUpPage(): Promise<void> {
        await this.homePage.navigate();
        await this.homePage.navigateToRegister();

        await expect(this.page).toHaveTitle(this.signUpPage.TITLE);
    }

    async navigateToLoginPage(): Promise<void> {
        await this.homePage.navigate();
        await this.homePage.navigateToLogin();

        await expect(this.page).toHaveTitle(this.logInPage.TITLE);
    }

    async logout(): Promise<void> {
        await this.homePage.logout();

        expect(this.homePage.isUserLoggedIn()).toBeFalsy();
    }
}
