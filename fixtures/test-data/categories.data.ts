import type { CategoryInfo, SortTestCase } from '@types';

export const ALL_CATEGORIES: CategoryInfo[] = [
    { name: 'Books', slug: 'books' },
    { name: 'Computers', slug: 'computers', hasSubCategories: true },
    { name: 'Electronics', slug: 'electronics', hasSubCategories: true },
    { name: 'Apparel & Shoes', slug: 'apparel-shoes' },
    { name: 'Digital downloads', slug: 'digital-downloads' },
    { name: 'Jewelry', slug: 'jewelry' },
    { name: 'Gift Cards', slug: 'gift-cards' },
    { name: 'Desktops', slug: 'desktops', parentCategory: 'Computers' },
    { name: 'Notebooks', slug: 'notebooks', parentCategory: 'Computers' },
    { name: 'Accessories', slug: 'accessories', parentCategory: 'Computers' },
    { name: 'Camera, photo', slug: 'camera-photo', parentCategory: 'Electronics' },
    { name: 'Cell phones', slug: 'cell-phones', parentCategory: 'Electronics' },
];

export const SORT_TEST_CASE: SortTestCase[] = [
    { label: 'Name: A to Z', sortType: 'name', sortORder: 'asc' },
    { label: 'Name: Z to A', sortType: 'name', sortORder: 'desc' },
    { label: 'Price: Low to High', sortType: 'price', sortORder: 'asc' },
    { label: 'Price: High to Low', sortType: 'price', sortORder: 'desc' },
];
