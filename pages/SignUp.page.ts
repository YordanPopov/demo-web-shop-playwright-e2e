import { Page, expect } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Types */
import { RegistrationData } from '@test-data/users.data';
import { ValidationErrors } from '@test-data/users.data';

export default class SignUpPage extends BasePage {
    /* Page metadata */
    override readonly URL = 'https://demowebshop.tricentis.com/register';
    override readonly TITLE = 'Demo Web Shop. Register';

    /* Form fields */
    private readonly form = {
        genderMale: this.page.locator('#gender-male'),
        genderFemale: this.page.locator('#gender-female'),
        firstName: this.page.locator('#FirstName'),
        lastName: this.page.locator('#LastName'),
        email: this.page.locator('#Email'),
        password: this.page.locator('#Password'),
        confirmPassword: this.page.locator('#ConfirmPassword'),
        registerButton: this.page.locator('#register-button'),
    };

    /* Error messages */
    private readonly errors = {
        firstName: this.page.locator('span[data-valmsg-for="FirstName"]'),
        lastName: this.page.locator('span[data-valmsg-for="LastName"]'),
        email: this.page.locator('span[data-valmsg-for="Email"]'),
        password: this.page.locator('span[data-valmsg-for="Password"]'),
        confirmPassword: this.page.locator('span[data-valmsg-for="ConfirmPassword"]'),
    };

    private readonly continueButton = this.page.locator('.register-continue-button');

    constructor(page: Page) {
        super(page);
    }

    override async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    override async verifyPageTitle(title: string): Promise<void> {
        await expect.soft(this.page).toHaveTitle(title);
    }

    async selectGender(gender: 'male' | 'female'): Promise<void> {
        const option = gender === 'male' ? this.form.genderMale : this.form.genderFemale;
        await option.check();
    }

    async fillRegistrationForm(data: RegistrationData): Promise<void> {
        if (data.gender) {
            await this.selectGender(data.gender);
        }

        await this.form.firstName.fill(data.firstName);
        await this.form.lastName.fill(data.lastName);
        await this.form.email.fill(data.email);
        await this.form.password.fill(data.password);
        await this.form.confirmPassword.fill(data.confirmPassword);
    }

    async submitSignUp(): Promise<void> {
        await this.form.registerButton.click();
    }

    async register(data: RegistrationData): Promise<void> {
        await this.fillRegistrationForm(data);
        await this.submitSignUp();
    }

    async verifyRegistration(): Promise<void> {
        await expect.soft(this.continueButton).toBeVisible();
    }

    async getValidationErrors(): Promise<ValidationErrors> {
        const errors: ValidationErrors = {};

        for (const [field, locator] of Object.entries(this.errors)) {
            const text = await locator.textContent();
            if (text?.trim()) {
                errors[field as keyof ValidationErrors] = text.trim();
            }
        }

        return errors;
    }
}
