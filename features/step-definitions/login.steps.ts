import { Given, When, Then, setDefaultTimeout, After } from '@cucumber/cucumber';
import { expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

setDefaultTimeout(60 * 1000); // 60 segundos

let loginPage: LoginPage;

Given('que estou na página de login', async function () {
  // Inicializa o browser/context/page se ainda não existir
  if (!this.page) {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }
  loginPage = new LoginPage(this.page);
  const baseUrl = process.env.BASE_URL || 'https://app.dev.plataforma2.altoqi.com.br';
  await loginPage.goto(baseUrl);
});

When('eu faço login com o email {string} e senha {string}', async function (email: string, senha: string) {
  await loginPage.login(email, senha);
});

When('eu marco a opção manter logado', async function () {
  await loginPage.keepLoggedCheckbox.check();
});

Then('devo ver uma mensagem de erro {string}', async function (mensagem: string) {
  await expect(loginPage.getAlertByText(mensagem)).toContainText(mensagem);
});

Then('devo ser redirecionado para a página de perfil', async function () {
  await expect(this.page).toHaveURL(/\/profile/, { timeout: 15000 });
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
    this.browser = undefined;
    this.page = undefined;
  }
});