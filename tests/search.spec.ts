import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { PdpPage } from "../pages/pdp.page";
import { validUser } from "../data/login.data";

test.describe("Feature: Search product", () => {
  test("Scenario: Successful search product and navigate to PDP", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pdpPage = new PdpPage(page);

    await loginPage.navigateTo("https://www.saucedemo.com");
    await loginPage.openSession(validUser.user, validUser.password);

    await dashboardPage.searchProduct();

    await expect(pdpPage.backProductsBtn).toBeVisible();
    await expect(pdpPage.addCartPdpBtn).toBeVisible();
  });
});
