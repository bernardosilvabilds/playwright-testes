import { Page, expect } from '@playwright/test';

export class OnboardingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoSignIn() {
    await this.page.goto('https://app.dev.plataforma2.altoqi.com.br/signIn');
  }

  async login(email: string, senha: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Senha' }).fill(senha);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }

  async preencherNome(nome: string) {
    await this.page.getByRole('textbox', { name: 'Nome completo' }).fill(nome);
  }

  async preencherTelefone(telefone: string) {
    await this.page.getByRole('textbox', { name: 'Telefone' }).fill(telefone);
  }

  async selecionarPais(pais: string) {
    await this.page.getByText('Selecione o país').click();
    await this.page.getByText(pais).click();
  }

  async selecionarCidade(cidade: string) {
    await this.page.getByRole('textbox', { name: 'Digite o nome da cidade' }).fill(cidade);
    await this.page.getByText(new RegExp(cidade, 'i')).click();
  }

  async clicarProximo() {
    await this.page.getByRole('button', { name: 'Próximo' }).click();
  }

  async preencherCamposObrigatorios(dados: { nome: string; email: string; senha: string }) {
    await this.page.fill('input[name="nome"]', dados.nome);
    await this.page.fill('input[name="email"]', dados.email);
    await this.page.fill('input[name="senha"]', dados.senha);
  }

  async finalizarOnboarding() {
    await this.page.click('button[type="submit"]');
  }

  async mensagemBoasVindasVisivel() {
    return this.page.isVisible('text=Bem-vindo');
  }

  async uploadFotoPerfil(caminhoArquivo: string) {
    await this.page.setInputFiles('input[type="file"][name="fotoPerfil"]', caminhoArquivo);
  }

  async verificarErroCampo(campo: string) {
    return this.page.isVisible(`text=erro de validação para o campo \"${campo}\"`);
  }

  async verificarErrosCampos(campos: string[]) {
    for (const campo of campos) {
      if (!(await this.verificarErroCampo(campo))) {
        return false;
      }
    }
    return true;
  }

  async campoPrePreenchido(nome: string) {
    return (await this.page.inputValue('input[name="nomeCompleto"]')) === nome;
  }

  async campoHabilitado(nomeCampo: string) {
    return !(await this.page.isDisabled(`input[name="${nomeCampo}"]`));
  }

  async mensagemErroFormatoTelefone() {
    return this.page.isVisible('text=erro de formato para o campo "Telefone"');
  }

  async mensagemErroFormatoTempoReal() {
    return this.page.isVisible('text=mensagem de erro de formato em tempo real');
  }

  async fotoPerfilVisivel() {
    return this.page.isVisible('img[alt="Foto de perfil"]');
  }

  async goto(baseUrl?: string) {
    const url = baseUrl || 'https://app.dev.plataforma2.altoqi.com.br/onboarding';
    await this.page.goto(url);
  }

  async preencherCampo(campo: string, valor: string) {
    // Normaliza o nome do campo para facilitar o switch
    const campoLower = campo.toLowerCase();
    if (campoLower.includes('url customizada')) {
      await this.page.getByRole('textbox', { name: /url customizada/i }).fill(valor);
    } else if (campoLower.includes('nome')) {
      await this.preencherNome(valor);
    } else if (campoLower.includes('telefone')) {
      await this.preencherTelefone(valor);
    } else if (campoLower.includes('cidade')) {
      await this.page.getByRole('textbox', { name: /cidade/i }).fill(valor);
    } else {
      // Tenta preencher por label genérica
      await this.page.getByLabel(campo).fill(valor);
    }
  }

  async validarHeading(heading: string) {
    await expect(
      this.page.locator('form').getByRole('heading', { name: heading })
    ).toBeVisible({ timeout: 15000 });
  }

  async avancarEtapa() {
    await this.clicarProximo();
  }

  async selecionarRecomendacao(recomendacao: string) {
    await this.page.getByRole('heading', { name: /Defina suas preferências de/i }).click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${recomendacao}$`, 'i') }).first().click();
  }

  async validarHeadingTudoPronto() {
    await this.page.getByRole('heading', { name: /Tudo pronto!/i }).click();
  }

  async validarTextoFinal(texto: string) {
    await this.page.getByText(new RegExp(texto, 'i')).click();
  }

  async clicarIrParaFeed() {
    await this.page.getByRole('button', { name: /Ir para o feed da Bilds/i }).click();
  }
} 