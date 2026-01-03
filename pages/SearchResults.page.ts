import { Page, Locator } from '@playwright/test';

/* Page objects */
import BasePage from './Base.page';

/* Components */
import { HeaderComponent, FooterComponent } from '@components';

export default class SearchResults extends BasePage {
    override readonly TITLE = 'Demo Web Shop. Search';

    /* Components */
    private header: HeaderComponent;
    private footer: FooterComponent;

    /* Search results page specific elements */
    private readonly searchInput: Locator;
    private readonly priceFromInput: Locator;
    private readonly priceToInput: Locator;

    private readonly advancedSearchCheck: Locator;
    private readonly searchSubCategoriesCheck: Locator;
    private readonly searchProductDescriptionCheck: Locator;

    private readonly categorySelect: Locator;
    private readonly manufacturerSelect: Locator;
    private readonly sortBySelect: Locator;
    private readonly displayPerPageSelect: Locator;
    private readonly viewAsSelect: Locator;

    private readonly searchButton: Locator;

    private readonly foundProductCard: Locator;
    private readonly resultMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);

        this.searchInput = page.locator('input.search-text');
        this.priceFromInput = page.locator('input.price-from');
        this.priceToInput = page.locator('input.price-to');
        this.advancedSearchCheck = page.locator('.inputs input[id="As"]');
        this.searchSubCategoriesCheck = page.locator('.inputs input[id="Isc"]');
        this.searchProductDescriptionCheck = page.locator('.inputs input[id="Sid"]');
        this.categorySelect = page.locator('select[id="Cid"]');
        this.manufacturerSelect = page.locator('select[id="Mid"]');

        this.sortBySelect = page.locator('#products-orderby');
        this.displayPerPageSelect = page.locator('#products-pagesize');
        this.viewAsSelect = page.locator('#products-viewmode');

        this.searchButton = page.locator('.search-button');
        this.foundProductCard = page.locator('.item-box');
        this.resultMessage = page.locator('.search-results');
    }
}
