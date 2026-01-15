import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

/* Types */
import { CategorySlug, SortOptions, SortOrder } from '@types';

export default class CategoryPage extends BasePage {
    override readonly URL = 'https://demowebshop.tricentis.com/';

    /* Components */
    readonly header: HeaderComponent;
    readonly footer: FooterComponent;

    /* Breadcrumb */
    private readonly breadcrumb: Locator;
    private readonly breadcrumbItems: Locator;

    /* Page title */
    private readonly pageTitle: Locator;

    /* Filters */
    private readonly priceRangeFilter: Locator;
    private readonly priceRangeOptions: Locator;

    /* Product controls */
    private readonly sortByDropDown: Locator;
    private readonly pageSizeDropdown: Locator;
    private readonly viewModelDropdown: Locator;

    /* Products */
    private readonly productGrid: Locator;
    private readonly productCard: Locator;
    private readonly productTitles: Locator;
    private readonly productPrices: Locator;
    private readonly productOldPrices: Locator;
    private readonly addToCartButtons: Locator;

    /* Pagination */
    private readonly pager: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        /* Breadcrumb */
        this.breadcrumb = page.locator('div.breadcrumb');
        this.breadcrumbItems = page.locator('div.breadcrumb > ul li');

        /* Page title */
        this.pageTitle = page.locator('.page-title');

        /* Filters */
        this.priceRangeFilter = page.locator('.price-range-filter');
        this.priceRangeOptions = page.locator('.price-range-selector a');

        /* Product controls */
        this.sortByDropDown = page.locator('#products-orderby');
        this.pageSizeDropdown = page.locator('#products-pagesize');
        this.viewModelDropdown = page.locator('#products-viewmode');

        /* Products */
        this.productGrid = page.locator('div.product-grid');
        this.productCard = page.locator('div.item-box');
        this.productTitles = page.locator('h2.product-title');
        this.productPrices = page.locator('div.prices .actual-price');
        this.productOldPrices = page.locator('div.prices .old-price');
        this.addToCartButtons = page.locator('input.product-box-add-to-cart-button');

        /* Pagination */
        this.pager = page.locator('.pager');
    }

    /* Navigation methods */
    async navigateToCategory(category: CategorySlug): Promise<void> {
        await this.page.goto(`${this.URL}/${category}`, {
            waitUntil: 'domcontentloaded',
        });
    }

    /* Product methods */
    async getProductsCount(): Promise<number> {
        return await this.productCard.count();
    }

    async getProductTitles(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map((text) => parseFloat(text.replace(/[^\d.]/g, '')));
    }

    async hasProducts(): Promise<boolean> {
        return (await this.getProductsCount()) > 0;
    }

    async clickProduct(index: number): Promise<void> {
        await this.productCard.nth(index).locator('.product-title a').click();
    }

    async clickProductByTitle(title: string): Promise<void> {
        await this.productCard.filter({ hasText: title }).first().click();
    }

    async addProductToCart(index: number): Promise<void> {
        const addToCartButton = this.addToCartButtons.nth(index);

        if ((await addToCartButton.count()) > 0) {
            await addToCartButton.click();
        } else {
            throw new Error(`Product with index: ${index} does not have "Add to cart" button!`);
        }
    }

    async addProductToCartByTitle(title: string): Promise<void> {
        const productCard = this.productCard.filter({ hasText: title });
        const addToCartButton = productCard.locator('.product-box-add-to-cart-button');

        if ((await addToCartButton.count()) === 0) {
            throw new Error(`Product with title: ${title} does not have "Add to cart" button!`);
        }

        await addToCartButton.click();
    }

    /* Sorting methods */
    async sortBy(option: SortOptions): Promise<void> {
        await this.sortByDropDown.selectOption({ label: option });
    }

    async verifySortByName(order: SortOrder): Promise<boolean> {
        const titles = await this.getProductTitles();
        const sortedTitles = [...titles].sort((a, b) =>
            order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
        );
        return JSON.stringify(titles) === JSON.stringify(sortedTitles);
    }

    async verifySortByPrice(order: SortOrder): Promise<boolean> {
        const prices = await this.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => (order === 'asc' ? a - b : b - a));

        return JSON.stringify(prices) === JSON.stringify(sortedPrices);
    }
}
