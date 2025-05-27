import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly keepLoggedCheckbox: Locator;
  readonly keepLoggedLabel: Locator;
  readonly forgotPasswordButton: Locator;
  readonly loginButton: Locator;
  readonly altqiLoginButton: Locator;
  readonly linkedinLoginButton: Locator;
  readonly googleLoginButton: Locator;
  readonly appleLoginButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.keepLoggedCheckbox = page.getByRole('checkbox', { name: 'Manter logado' });
    this.keepLoggedLabel = page.getByText('Manter logado');
    this.forgotPasswordButton = page.getByRole('button', { name: /esqueceu a senha\?/i });
    this.loginButton = page.getByRole('button', { name: 'Entrar' });
    this.altqiLoginButton = page.getByRole('button', { name: /Login com AltQi/i });
    this.linkedinLoginButton = page.getByRole('button', { name: /Login com Linkedin/i });
    this.googleLoginButton = page.getByRole('button', { name: /Login com Google/i });
    this.appleLoginButton = page.getByRole('button', { name: /Login com Apple/i });
    this.registerButton = page.getByRole('button', { name: /Cadastre-se agora/i });
  }

  async goto(baseUrl: string) {
    await this.page.goto(`${baseUrl}/signIn`);
  }

  async login(email: string, password: string, keepLogged = false) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (keepLogged) {
      await this.keepLoggedCheckbox.check();
    }
    await this.loginButton.click();
  }

  getAlertByText(text: string) {
    return this.page.getByText(text, { exact: false });
  }
} 