import { expect, Page } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

/* Types */
import type { LogInData, LoginValidationErrors } from '@types';

export default class LogInPage extends BasePage {
    /* Page metadata */
    override readonly URL = 'https://demowebshop.tricentis.com/login';
    override readonly TITLE = 'Demo Web Shop. Login';

    /* Components */
    private header: HeaderComponent;
    private footer: FooterComponent;

    /* Form fields */
    private readonly form = {
        email: this.page.locator('#Email'),
        password: this.page.locator('#Password'),
        rememberMeCheck: this.page.locator('#RememberMe'),
        logInButton: this.page.locator('input.login-button'),
    };

    /* Error messages */
    private readonly errors = {
        global: this.page.locator('div.validation-summary-errors'),
        email: this.page.locator('span[data-valmsg-for="Email"]'),
    };

    private readonly registerPageButton = this.page.locator('input.register-button');
    private readonly recoveryPasswordLink = this.page.getByRole('link', {
        name: /Forgot password?/,
    });

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);
    }

    async rememberMe(isChecked: boolean): Promise<void> {
        isChecked === true
            ? await this.form.rememberMeCheck.check()
            : await this.form.rememberMeCheck.uncheck();
    }

    async fillLogInForm(data: LogInData): Promise<void> {
        if (data.rememberMe) {
            await this.rememberMe(data.rememberMe);
        }

        await this.form.email.fill(data.email);
        await this.form.password.fill(data.password);
    }

    async submitLogIn(): Promise<void> {
        await this.form.logInButton.click();
    }

    async login(data: LogInData): Promise<void> {
        await this.fillLogInForm(data);
        await this.submitLogIn();
    }

    async verifySuccessfulLogin(): Promise<void> {
        const isLoggedIn = await this.header.isUserLoggedIn();

        expect(isLoggedIn).toBeTruthy();
        await expect(this.page).toHaveURL('/');
    }

    async getValidationErrors(): Promise<LoginValidationErrors> {
        const errors: LoginValidationErrors = {};

        for (const [field, locator] of Object.entries(this.errors)) {
            const text = await locator.textContent();
            if (text?.trim()) {
                errors[field as keyof LoginValidationErrors] = text.trim();
            }
        }

        return errors;
    }
}
