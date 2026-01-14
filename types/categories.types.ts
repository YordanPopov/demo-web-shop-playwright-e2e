export type CategorySlug =
    | 'books'
    | 'computers'
    | 'desktops'
    | 'notebooks'
    | 'accessories'
    | 'electronics'
    | 'camera-photo'
    | 'cell-phones'
    | 'apparel-shoes'
    | 'digital-downloads'
    | 'jewelry'
    | 'gift-cards';

export type SortOptions =
    | 'Position'
    | 'Name: A to Z'
    | 'Name: Z to A'
    | 'Price: Low to High'
    | 'Price: High to Low'
    | 'Created on';

export type SortType = 'name' | 'price';
export type SortOrder = 'asc' | 'desc';

export interface CategoryInfo {
    name: string;
    slug: CategorySlug;
    hasSubCategories?: boolean;
    parentCategory?: string;
}

export interface SortTestCase {
    label: SortOptions;
    sortType: SortType;
    sortORder: SortOrder;
}
