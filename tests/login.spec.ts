import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { validUser } from "../data/login.data";

test.describe("Feature: Login", () => {
  test(`Scenario: Successful Login for user ${validUser.user}`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo("https://www.saucedemo.com");
    await loginPage.openSession(validUser.user, validUser.password);

    await expect(loginPage.titleSpan).toHaveText("Products");
  });
});
