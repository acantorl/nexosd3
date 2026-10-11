import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { emptyUser, invalidUser } from "../data/login.data";

test.describe("Feature: Casos Negativos de Login", () => {
  test("Scenario: Intento de inicio de sesión con usuario bloqueado", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo("https://www.saucedemo.com");
    await loginPage.openSession("locked_out_user", "secret_sauce");

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test("Scenario: Attempt to log in with an empty user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo("https://www.saucedemo.com");
    await loginPage.openSession(emptyUser.user, emptyUser.password);

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      "Epic sadface: Username is required",
    );
  });
});
