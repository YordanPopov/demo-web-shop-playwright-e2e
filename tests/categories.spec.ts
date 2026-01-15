import { test } from '@steps/Step.factory';
import { ALL_CATEGORIES, SORT_TEST_CASE } from '@test-data/categories.data';

test.describe('Category Pages - Product Display', () => {
    for (const category of ALL_CATEGORIES) {
        test(
            `${category.name} - should display products`,
            {
                tag: ['@category', '@smoke'],
                annotation: [
                    { type: 'Category', description: category.name },
                    { type: 'CategorySlug', description: category.slug },
                ],
            },
            async ({ categorySteps }) => {
                await categorySteps.navigateToCategory(category.slug);
                await categorySteps.verifyProductsDisplayed();
            }
        );
    }
});

test.describe('Category Pages - Product Sorting', () => {
    for (const category of ALL_CATEGORIES) {
        test.describe(`${category.name}`, () => {
            for (const sortCase of SORT_TEST_CASE) {
                test(
                    `Sort by ${sortCase.label}`,
                    {
                        tag: ['@category', '@sorting'],
                        annotation: [
                            { type: 'Category', description: category.name },
                            { type: 'SortOption', description: sortCase.label },
                            { type: 'SortType', description: sortCase.sortType },
                            { type: 'sortOrder', description: sortCase.sortORder },
                        ],
                    },
                    async ({ categorySteps }) => {
                        await categorySteps.navigateToCategory(category.slug);
                        await categorySteps.sortProducts(sortCase.label);
                        await categorySteps.verifySorting(sortCase.sortType, sortCase.sortORder);
                    }
                );
            }
        });
    }
});
