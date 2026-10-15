import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly dismissErrorButton: Locator;
  readonly titleSpan: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");

    this.loginButton = page.getByRole("button", { name: "Login" });

    this.errorMessage = page.getByTestId("error");
    this.dismissErrorButton = page.getByTestId("error-button");
    this.titleSpan = page.getByTestId("title");
  }

  async open(): Promise<void> {
    await this.navigateTo("/");
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.submit();
  }

  async openSession(username: string, password: string): Promise<void> {
    await this.login(username, password);
  }

  async dismissError(): Promise<void> {
    await this.dismissErrorButton.click();
  }
}
