import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from '@pages/Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

/* Types */
import { Category } from '@types';

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
    async navigateToCategory(category: Category): Promise<void> {
        await this.page.goto(`${this.URL}/${category}`);
        await this.page.waitForLoadState('domcontentloaded');
    }
}
