import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from './Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class SearchResultsPage extends BasePage {
    override readonly TITLE = 'Demo Web Shop. Search';
    override readonly URL = 'https://demowebshop.tricentis.com/search';

    /* Components */
    private header: HeaderComponent;
    private footer: FooterComponent;

    /* Search results page specific elements */
    private readonly searchInput: Locator;
    private readonly priceFromInput: Locator;
    private readonly priceToInput: Locator;

    private readonly advancedSearchCheck: Locator;
    private readonly searchSubCategoriesCheckbox: Locator;
    private readonly searchProductDescriptionCheckbox: Locator;

    private readonly categoryDropdown: Locator;
    private readonly manufacturerDropdown: Locator;
    private readonly sortBySelect: Locator;
    private readonly displayPerPageSelect: Locator;
    private readonly viewAsSelect: Locator;

    private readonly searchButton: Locator;

    private readonly foundProductCard: Locator;
    private readonly noResultsMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        this.searchInput = page.locator('input.search-text');
        this.priceFromInput = page.locator('input.price-from');
        this.priceToInput = page.locator('input.price-to');
        this.advancedSearchCheck = page.locator('.inputs input[id="As"]');
        this.searchSubCategoriesCheckbox = page.locator('.inputs input[id="Isc"]');
        this.searchProductDescriptionCheckbox = page.locator('.inputs input[id="Sid"]');
        this.categoryDropdown = page.locator('select[id="Cid"]');
        this.manufacturerDropdown = page.locator('select[id="Mid"]');

        this.sortBySelect = page.locator('#products-orderby');
        this.displayPerPageSelect = page.locator('#products-pagesize');
        this.viewAsSelect = page.locator('#products-viewmode');

        this.searchButton = page.locator('.search-button');
        this.foundProductCard = page.locator('.item-box');
        this.noResultsMessage = page.locator('.search-results');
    }

    /* Search methods */
    async advancedSearch(options: {
        query: string;
        category?: string;
        manufacturer?: string;
        priceFrom?: number;
        priceTo?: number;
        searchInDescription?: boolean;
    }): Promise<void> {
        await this.advancedSearchCheck.check();

        await this.searchInput.fill(options.query);

        if (options.category) {
            await this.categoryDropdown.selectOption({ label: options.category });
        }

        if (options.manufacturer) {
            await this.manufacturerDropdown.selectOption({ label: options.manufacturer });
        }

        if (options.priceFrom !== undefined) {
            await this.priceFromInput.fill(String(options.priceFrom));
        }

        if (options.priceTo !== undefined) {
            await this.priceToInput.fill(String(options.priceTo));
        }

        if (options.searchInDescription) {
            await this.searchProductDescriptionCheckbox.check();
        }

        await this.searchButton.click();
    }

    /* Results methods */
    async getNoResultsMessage(): Promise<string> {
        return (await this.noResultsMessage.textContent()) || '';
    }

    async hasResult(): Promise<boolean> {
        return await this.foundProductCard.first().isVisible();
    }

    async getResultsCount() {
        if (!(await this.hasResult())) {
            return 0;
        }

        return await this.foundProductCard.count();
    }

    async getProductTitles(): Promise<string[]> {
        const foundProducts = await this.foundProductCard.all();
        let titles: string[] = [];

        for (const product of foundProducts) {
            const title = (await product.locator('.product-title a').textContent()).trim();

            if (title) titles.push(title);
        }

        return titles;
    }

    /* Validation methods */
    async allProductsContainKeyword(keyword: string): Promise<boolean> {
        const titles = await this.getProductTitles();

        return titles.every((title) => title.toLowerCase().includes(keyword.toLowerCase()));
    }

    /* Specific actions */
    async clickProductByIndex(index: number): Promise<void> {
        await this.foundProductCard.nth(index).locator('.picture a').click();
    }

    async clickProductByTitle(title: string): Promise<void> {
        await this.foundProductCard.filter({ hasText: title }).click();
    }

    async addProductToCart(title: string): Promise<void> {
        const productCard = this.foundProductCard.filter({ hasText: title });
        const addToCartButton = productCard.locator('input[type="button"][value="Add to cart"]');

        try {
            addToCartButton.waitFor({ state: 'visible', timeout: 3000 });

            addToCartButton.click();
        } catch (error) {
            throw new Error(`Failed to add product "${title}" to cart: ${error.message}`);
        }
    }
}
