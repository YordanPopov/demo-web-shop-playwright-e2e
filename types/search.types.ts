export interface SearchTestCase {
    description: string;
    query: string;
    expectedCount?: number;
    expectedMessage?: string;
}

export interface AdvancedSearchTestCase {
    description: string;
    query: string;
    category?: string;
    manufacturer?: string;
    priceFrom?: number;
    priceTo?: number;
    searchInDescription?: boolean;
    expectedCount?: number;
    expectedMessage?: string;
}
