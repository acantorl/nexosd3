import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { validUser } from "../data/login.data";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Feature: Logut", () => {
  test(`Scenario: Successful Logout for user ${validUser.user}`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.navigateTo("https://www.saucedemo.com");
    await loginPage.openSession(validUser.user, validUser.password);
    await dashboard.closedSession();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
