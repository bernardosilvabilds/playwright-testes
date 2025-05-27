import { Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, chromium, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60 segundos

let page: Page;

Given('que acesso a página de login', async function () {
  // Inicializa o browser/context/page se ainda não existir
  if (!this.page) {
    const headless = process.env.HEADLESS !== 'false';
    this.browser = await chromium.launch({ headless });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
  }
  page = this.page;
  const baseUrl = process.env.BASE_URL || 'https://app.dev.plataforma2.altoqi.com.br';
  await page.goto(`${baseUrl}/signIn`);
});

Then('a página deve carregar corretamente', async function () {
  const baseUrl = process.env.BASE_URL || 'https://app.dev.plataforma2.altoqi.com.br';
  await expect(this.page).toHaveURL(`${baseUrl}/signIn`);
  // Você pode adicionar mais asserts, como verificar se existe um campo de login
  await this.browser.close();
}); 