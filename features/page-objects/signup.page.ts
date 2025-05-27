import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly termsLabel: Locator;
  readonly signUpButton: Locator;
  readonly altqiSignUpButton: Locator;
  readonly linkedinSignUpButton: Locator;
  readonly googleSignUpButton: Locator;
  readonly appleSignUpButton: Locator;
  readonly loginButton: Locator;
  readonly alert: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.getByRole('textbox', { name: 'Nome completo' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.termsCheckbox = page.getByRole('checkbox', { name: /Termos e Condições/i });
    this.termsLabel = page.getByText('Eu concordo com os Termos e Condições');
    this.signUpButton = page.getByRole('button', { name: 'Criar conta' });
    this.altqiSignUpButton = page.getByRole('button', { name: /Login com AltQi/i });
    this.linkedinSignUpButton = page.getByRole('button', { name: /Login com Linkedin/i });
    this.googleSignUpButton = page.getByRole('button', { name: /Login com Google/i });
    this.appleSignUpButton = page.getByRole('button', { name: /Login com Apple/i });
    this.loginButton = page.getByRole('button', { name: 'Entrar' });
    this.alert = page.locator('[role="alert"]');
    this.errorMessage = page.locator('form span');
  }

  async goto(baseUrl: string) {
    await this.page.goto(`${baseUrl}/signUp`);
  }

  async signUp(fullName: string, email: string, password: string, confirmPassword: string, acceptTerms = true) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    if (acceptTerms) {
      await this.termsCheckbox.check();
    }
    await this.signUpButton.click();
  }

  getAlertByText(text: string) {
    return this.page.getByText(text, { exact: false });
  }

  getErrorMessageByText(text: string) {
    return this.page.getByText(text, { exact: false });
  }

  getInputErrorByText(text: string) {
    return this.page.locator('form span.input-error', { hasText: text });
  }

  async logVisibleTexts() {
    const texts = await this.page.$$eval('*', elements => {
      return elements
        .filter(e => e instanceof HTMLElement && e.offsetParent !== null && e.innerText && e.innerText.trim().length > 0)
        .map(e => (e as HTMLElement).innerText.trim());
    });
    // eslint-disable-next-line no-console
    console.log('TEXTOS VISÍVEIS NA TELA:', texts);
    return texts;
  }

  async takeScreenshotOnError(filename: string) {
    await this.page.screenshot({ path: filename, fullPage: true });
    // eslint-disable-next-line no-console
    console.log(`Screenshot salvo em: ${filename}`);
  }

  async getToastByText(text: string, timeout = 12000) {
    // Busca por [role='alert'] com o texto
    const alert = this.page.locator('[role="alert"]', { hasText: text });
    if (await alert.count() > 0) {
      try {
        await alert.first().waitFor({ state: 'visible', timeout });
        return alert.first();
      } catch {}
    }
    // Busca por texto genérico na tela
    const any = this.page.getByText(text, { exact: false });
    if (await any.count() > 0) {
      try {
        await any.first().waitFor({ state: 'visible', timeout });
        return any.first();
      } catch {}
    }
    return null;
  }

  async getAnyErrorMessageByText(text: string) {
    // 1. Busca em span.input-error dentro do form
    const inline = this.page.locator('form span.input-error', { hasText: text });
    if (await inline.count() > 0 && await inline.first().isVisible()) {
      return inline.first();
    }
    // 2. Busca em [role=alert] ou toast
    const toast = await this.getToastByText(text);
    if (toast) {
      return toast;
    }
    // 2.1 Busca em <li> com o texto
    const li = this.page.locator('li', { hasText: text });
    if (await li.count() > 0 && await li.first().isVisible()) {
      return li.first();
    }
    // 3. Busca por qualquer texto visível na página
    const any = this.page.getByText(text, { exact: false });
    if (await any.count() > 0 && await any.first().isVisible()) {
      return any.first();
    }
    // 2.5. Busca em <p class='text-red-500'>
    const pRed = this.page.locator('p.text-red-500', { hasText: text });
    if (await pRed.count() > 0 && await pRed.first().isVisible()) {
      return pRed.first();
    }
    // 2.6. Busca em <span class='input-error text-red-500'>
    const spanRed = this.page.locator('span.input-error.text-red-500', { hasText: text });
    if (await spanRed.count() > 0 && await spanRed.first().isVisible()) {
      return spanRed.first();
    }
    // LOGS E SCREENSHOT ANTES DE LANÇAR O ERRO
    await this.logVisibleTexts();
    await this.takeScreenshotOnError('erro-signup.png');
    throw new Error(`Mensagem de erro '${text}' não encontrada em nenhum seletor conhecido.`);
  }

  async uncheckTermsCheckbox() {
    if (await this.termsCheckbox.isChecked()) {
      await this.termsCheckbox.uncheck();
    }
  }
} 