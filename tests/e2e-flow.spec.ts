import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { PdpPage } from "../pages/pdp.page";
import { validUser } from "../data/login.data";

test.describe("Feature: End to End Flow", () => {
  test("Scenario: Successful E2E Flow - Login, Select Product and Logout", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pdpPage = new PdpPage(page);

    // 1. Login
    await loginPage.navigateTo("https://www.saucedemo.com");
    await loginPage.openSession(validUser.user, validUser.password);
    await expect(loginPage.titleSpan).toHaveText("Products");

    // 2. Búsqueda / Selección de producto e inspección en PDP
    await dashboardPage.searchProduct();
    await expect(pdpPage.backProductsBtn).toBeVisible();

    // Regresar al dashboard para el cierre de sesión
    await pdpPage.backProductsBtn.click();

    // 3. Logout
    await dashboardPage.closedSession();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});
