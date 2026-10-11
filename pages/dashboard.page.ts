import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
  readonly menuBtn: Locator;
  readonly logOutInput: Locator;
  readonly filterBtn: Locator;
  readonly itemFiveProduct: Locator;

  constructor(page: Page) {
    super(page);

    this.menuBtn = page.locator("#react-burger-menu-btn");
    this.logOutInput = page.locator("#logout_sidebar_link");
    this.filterBtn = page.locator('[data-test="product-sort-container"]');

    this.itemFiveProduct = page.locator("#item_5_title_link");
  }

  async closedSession(): Promise<void> {
    await this.menuBtn.click();
    await this.logOutInput.click();
  }

  async searchProduct(): Promise<void> {
    await this.filterBtn.selectOption("hilo");
    await this.itemFiveProduct.click();
  }
}
