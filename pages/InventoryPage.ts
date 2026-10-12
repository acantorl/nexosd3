import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class InventoryPage extends BasePage {
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productList: Locator;
  readonly productCards: Locator;
  readonly productFilter: Locator;
  readonly firstProduct: Locator;

  constructor(page: Page) {
    super(page);

    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.productList = page.getByTestId("inventory-list");
    this.productCards = page.getByTestId("inventory-item");
    this.productFilter = page.getByTestId("product-sort-container");
    this.firstProduct = this.productCards.first();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async selectProductSort(option: string): Promise<void> {
    await this.productFilter.selectOption(option);
  }

  async sortByPriceHighToLow(): Promise<void> {
    await this.selectProductSort("hilo");
  }

  async firstProductName(): Promise<string> {
    return (
      await this.firstProduct.getByTestId("inventory-item-name").innerText()
    ).trim();
  }

  async firstProductPrice(): Promise<string> {
    return (
      await this.firstProduct.getByTestId("inventory-item-price").innerText()
    ).trim();
  }

  async openFirstProduct(): Promise<void> {
    await this.firstProduct.getByTestId("inventory-item-name").click();
  }

  productByName(name: string): Locator {
    return this.productCards.filter({ hasText: name });
  }
}
