import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class PdpPage extends BasePage {
  readonly backProductsBtn: Locator;
  readonly addCartPdpBtn: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    super(page);

    this.backProductsBtn = page.locator("#back-to-products");
    this.addCartPdpBtn = page.locator("#add-to-cart");
    this.productName = page.locator(".inventory_details_name");
  }

  async addCart(): Promise<void> {
    await this.addCartPdpBtn.click();
  }
}
