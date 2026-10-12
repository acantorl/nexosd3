import { expect, test } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

const standardUsername = process.env.SAUCEDEMO_USERNAME ?? "standard_user";
const standardPassword = process.env.SAUCEDEMO_PASSWORD ?? "secret_sauce";
const blockedUsername =
  process.env.SAUCEDEMO_BLOCKED_USERNAME ?? "locked_out_user";

test.describe("SauceDemo", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
  });

  test("CP-01: inicia sesión con credenciales válidas", async ({ page }) => {
    await loginPage.login(standardUsername, standardPassword);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productList).toBeVisible();
  });

  test("CP-02: ordena y abre el producto de mayor precio", async ({ page }) => {
    await loginPage.login(standardUsername, standardPassword);
    await expect(inventoryPage.productList).toBeVisible();

    await inventoryPage.sortByPriceHighToLow();
    const expectedName = await inventoryPage.firstProductName();
    const expectedPrice = await inventoryPage.firstProductPrice();

    await inventoryPage.openFirstProduct();

    await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
    await expect(page.getByTestId("inventory-item-name")).toHaveText(
      expectedName,
    );
    await expect(page.getByTestId("inventory-item-price")).toHaveText(
      expectedPrice,
    );
  });

  test("CP-03: cierra sesión correctamente", async ({ page }) => {
    await loginPage.login(standardUsername, standardPassword);
    await expect(inventoryPage.productList).toBeVisible();

    await inventoryPage.logout();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("CP-04: muestra un error con una contraseña incorrecta", async ({
    page,
  }) => {
    await loginPage.login(standardUsername, "cxcxcxcx");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test("CP-05: rechaza el acceso de un usuario bloqueado", async ({ page }) => {
    await loginPage.login(blockedUsername, standardPassword);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test("CP-06: solicita el usuario cuando las credenciales están vacías", async ({
    page,
  }) => {
    await loginPage.login("", "");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username is required",
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test("CP-08: bloquea la navegación directa a un producto tras cerrar sesión", async ({
    page,
  }) => {
    await loginPage.login(standardUsername, standardPassword);
    await expect(inventoryPage.productList).toBeVisible();

    const secondTab = await page.context().newPage();
    await secondTab.goto("/");

    await inventoryPage.logout();
    await secondTab.goto("/inventory-item.html?id=4");

    await expect(secondTab).toHaveURL(/saucedemo\.com\/?$/);
    await expect(
      secondTab.getByRole("button", { name: "Login" }),
    ).toBeVisible();
  });
});
