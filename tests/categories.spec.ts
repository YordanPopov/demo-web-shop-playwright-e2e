import { test } from '@steps/Step.factory';
import { CATEGORIES } from '@test-data/categories.data';

test.describe('Category Pages - All Categories', () => {
    for (const category of CATEGORIES) {
        test.describe(`${category.name} Category`, () => {
            test('Display products', { tag: '@category' }, async ({ categorySteps }) => {
                await categorySteps.navigateToCategory(category.slug);
                await categorySteps.verifyProductsDisplayed();
            });
        });
    }
});
