export type Category =
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

export interface Categories {
    name: string;
    slug: Category;
}
