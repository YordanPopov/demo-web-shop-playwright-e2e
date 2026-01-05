import { AdvancedSearchTestCase, SearchTestCase } from '@types';

export const VALID_SEARCH_QUERIES: SearchTestCase[] = [
    {
        description: 'Search for laptop',
        query: 'laptop',
        expectedCount: 1,
    },
    {
        description: 'Search for computer',
        query: 'computer',
        expectedCount: 4,
    },
    {
        description: 'Search for book',
        query: 'book',
        expectedCount: 1,
    },
    {
        description: 'Search for phone',
        query: 'phone',
        expectedCount: 4,
    },
    {
        description: 'Search with partial match',
        query: 'comput',
        expectedCount: 4,
    },
    {
        description: 'Search with uppercase',
        query: 'LAPTOP',
        expectedCount: 1,
    },
    {
        description: 'Search with mixed case',
        query: 'LaPtOp',
        expectedCount: 1,
    },
    {
        description: 'Search with spaces',
        query: '   laptop   ',
        expectedCount: 1,
    },
    {
        description: 'Search with numbers',
        query: '14.1',
        expectedCount: 1,
    },
];

export const NO_RESULTS_QUERIES: SearchTestCase[] = [
    {
        description: 'Search with non-existent product',
        query: 'xyznonexistentproduct123',
        expectedMessage: 'No products',
    },
    {
        description: 'Search with random characters',
        query: '@#$%^&*()',
        expectedMessage: 'No products',
    },
    {
        description: 'Search with very long string',
        query: 'a'.repeat(200),
        expectedMessage: 'No products',
    },
    {
        description: 'Search with single character',
        query: 'a',
        expectedMessage: 'minimum length is 3 characters',
    },
    {
        description: 'Search with special characters in valid query',
        query: 'laptop 14.1"',
        expectedMessage: 'No products',
    },
];

export const VALID_ADVANCED_SEARCH_CASES: AdvancedSearchTestCase[] = [
    {
        description: 'search with price range',
        query: 'computer',
        priceFrom: 500,
        priceTo: 1500,
        expectedCount: 3,
    },

    {
        description: 'search in product description',
        query: 'build',
        searchInDescription: true,
        expectedCount: 4,
    },
];

export const NO_RESULTS_ADVANCED_SEARCH_CASES: AdvancedSearchTestCase[] = [
    {
        description: 'search in specific category',
        query: 'laptop',
        category: 'Computers',
        expectedMessage: 'No products',
    },
    {
        description: 'combined advanced search',
        query: 'laptop',
        category: 'Computers',
        priceFrom: 1000,
        priceTo: 2000,
        searchInDescription: true,
        expectedMessage: 'No products',
    },
    {
        description: 'search by manufacturer',
        query: '',
        manufacturer: 'Tricentis',
        expectedMessage: 'minimum length is 3 characters',
    },
];
