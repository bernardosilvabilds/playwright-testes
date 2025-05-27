import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, chromium, Page } from '@playwright/test';
import { SignUpPage } from '../page-objects/signup.page';

setDefaultTimeout(60 * 1000); // 60 segundos

let signUpPage: SignUpPage;
let nome = '';
let email = '';
let senha = '';
let confirmacao = '';
let aceitouTermos = true;

Given('que estou na página de cadastro', async function () {
  // Inicializa o browser/context/page se ainda não existir
  if (!this.page) {
    const headless = false;
    this.browser = await chromium.launch({ headless });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }
  signUpPage = new SignUpPage(this.page);
  const baseUrl = process.env.BASE_URL || 'https://app.dev.plataforma2.altoqi.com.br';
  await signUpPage.goto(baseUrl);
  // Resetar variáveis para cada cenário
  nome = '';
  email = '';
  senha = '';
  confirmacao = '';
  aceitouTermos = true;
});

When('eu preencho o nome com {string}', async function (valor: string) {
  nome = valor;
});

When('eu preencho o email com {string}', async function (valor: string) {
  email = valor;
});

When('eu preencho a senha com {string}', async function (valor: string) {
  senha = valor;
});

When('eu preencho a confirmação de senha com {string}', async function (valor: string) {
  confirmacao = valor;
});

When('eu aceito os termos e condições', async function () {
  aceitouTermos = true;
});

When('eu não aceito os termos e condições', async function () {
  aceitouTermos = false;
  await signUpPage.uncheckTermsCheckbox();
});

When(/^eu clico no botão de (?:cadastrar|criar conta|Criar conta)$/i, async function () {
  await signUpPage.signUp(nome, email, senha, confirmacao, aceitouTermos);
});

When('eu forço o blur do campo de email', async function () {
  await signUpPage.passwordInput.click();
});

Then('devo ser redirecionado para a página de login', async function () {
  await expect(this.page).toHaveURL(/\/signIn/, { timeout: 15000 });
});

Then('devo ver a mensagem de erro {string}', async function (mensagem: string) {
  await expect(signUpPage.getAlertByText(mensagem)).toContainText(mensagem);
});

Then(/^devo ver (?:uma|a) mensagem de erro {string}$/, async function (mensagem: string) {
  await expect(signUpPage.getAlertByText(mensagem)).toContainText(mensagem);
});

Then('devo ver as mensagens de erro:', async function (dataTable) {
  for (const row of dataTable.hashes()) {
    await expect(signUpPage.page.locator(`text=${row.Mensagem}`)).toBeVisible();
  }
}); 