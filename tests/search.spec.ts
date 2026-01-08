import { test } from '@steps/Step.factory';
import {
    VALID_SEARCH_QUERIES,
    NO_RESULTS_QUERIES,
    VALID_ADVANCED_SEARCH_CASES,
    NO_RESULTS_ADVANCED_SEARCH_CASES,
} from '@test-data/search.data';

test.describe('Product search - Positive scenarios', () => {
    for (const testCase of VALID_SEARCH_QUERIES) {
        test(
            `${testCase.description}`,
            {
                tag: ['@search', '@positive', '@smoke'],
                annotation: [
                    { type: 'ScenarioInfo', description: `${testCase.description}` },
                    { type: 'Keyword', description: testCase.query },
                    { type: 'FoundProducts', description: `${testCase.expectedCount}` },
                ],
            },
            async ({ sharedSteps, searchSteps }) => {
                await sharedSteps.navigateToHomePage();

                await searchSteps.searchProduct(testCase.query);
                await searchSteps.verifySearchResults();
                await searchSteps.verifyResultsCount(testCase.expectedCount);
            }
        );
    }
});

test.describe('Product search - Negative scenarios', () => {
    for (const testCase of NO_RESULTS_QUERIES) {
        test(
            `${testCase.description} `,
            {
                tag: ['@search', '@negative'],
                annotation: [
                    { type: 'ScenarioInfo', description: testCase.description },
                    { type: 'Keyword', description: testCase.query },
                    { type: 'ExpectedMessage', description: testCase.expectedMessage },
                ],
            },
            async ({ sharedSteps, searchSteps }) => {
                await sharedSteps.navigateToHomePage();

                await searchSteps.searchProduct(testCase.query);
                await searchSteps.verifyNoResultsMessage(testCase.expectedMessage);
            }
        );
    }
});

test.describe('Product advanced search - Positive scenarios ', () => {
    for (const testCase of VALID_ADVANCED_SEARCH_CASES) {
        test(
            `${testCase.description}`,
            {
                tag: ['@search', '@advancedSearch', '@positive'],
                annotation: [
                    { type: 'ScenarioInfo', description: testCase.description },
                    { type: 'Keyword', description: testCase.searchData.query },
                    { type: 'FoundProducts', description: `${testCase.expectedCount}` },
                ],
            },
            async ({ sharedSteps, searchSteps }) => {
                await sharedSteps.navigateToHomePage();

                await searchSteps.advancedSearchProduct(testCase.searchData);
                await searchSteps.verifySearchResults();
                await searchSteps.verifyResultsCount(testCase.expectedCount);
            }
        );
    }
});

test.describe('Product advanced search - Negative scenarios', () => {
    for (const testCase of NO_RESULTS_ADVANCED_SEARCH_CASES) {
        test(
            `${testCase.description}`,
            {
                tag: ['@search', '@advancedSearch', '@negative'],
                annotation: [
                    { type: 'ScenarioInfo', description: testCase.description },
                    { type: 'Keyword', description: testCase.searchData.query },
                    { type: 'ExpectedMessage', description: testCase.expectedMessage },
                ],
            },
            async ({ sharedSteps, searchSteps }) => {
                await sharedSteps.navigateToHomePage();

                await searchSteps.advancedSearchProduct(testCase.searchData);
                await searchSteps.verifyNoResultsMessage(testCase.expectedMessage);
            }
        );
    }
});
