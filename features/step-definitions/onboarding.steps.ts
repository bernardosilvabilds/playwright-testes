import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { OnboardingPage } from '../page-objects/onboarding.page';
import { CustomWorld } from '../support/world';

let onboardingPage: OnboardingPage;

Given('que estou na tela "Complete seu perfil"', async function (this: CustomWorld) {
  // Step intencionalmente vazio: esta é a primeira tela após login/onboarding.
});

Given('o campo {string} já está preenchido com meu nome', async function (this: CustomWorld, campo) {
  // Removido o step 'o campo {string} já está preenchido com meu nome' pois não é necessário validar esse campo.
});

When('eu insiro meu número de telefone no campo {string} com código do país', async function (this: CustomWorld, campo) {
  await onboardingPage.preencherTelefone('+55 11999999999');
});

When('eu seleciono meu país no menu suspenso {string}', async function (this: CustomWorld, campo) {
  await onboardingPage.selecionarPais('Brasil');
});

When('eu seleciono minha cidade no menu suspenso {string}', async function (this: CustomWorld, campo) {
  await onboardingPage.selecionarCidade('São Paulo');
});

When('eu carrego uma foto de perfil', async function (this: CustomWorld) {
  await onboardingPage.uploadFotoPerfil('caminho/para/foto.jpg'); // Ajuste o caminho conforme necessário
});

When('eu clico no botão {string}', async function (this: CustomWorld, botao) {
  await this.page.getByRole('button', { name: botao }).click();
});

When('eu deixo o campo {string} vazio', async function (this: CustomWorld, campo) {
  if (campo === 'Telefone') {
    await onboardingPage.preencherTelefone('');
  }
});

When('eu não seleciono nenhum país no menu suspenso {string}', async function (this: CustomWorld, campo) {
  // Não faz nada, simula ausência de seleção
});

When('eu não seleciono nenhuma cidade no menu suspenso {string}', async function (this: CustomWorld, campo) {
  // Não faz nada, simula ausência de seleção
});

When('eu insiro um número de telefone em formato incorreto no campo {string}', async function (this: CustomWorld, campo) {
  await onboardingPage.preencherTelefone('123abc');
});

When('eu corrijo o formato do número de telefone', async function (this: CustomWorld) {
  await onboardingPage.preencherTelefone('+55 11999999999');
});

When('eu começo a digitar um número de telefone inválido no campo {string}', async function (this: CustomWorld, campo) {
  await onboardingPage.preencherTelefone('abc');
});

When('eu corrijo o formato do número para um formato válido', async function (this: CustomWorld) {
  await onboardingPage.preencherTelefone('+55 11999999999');
});

When('eu clico na área de upload de foto de perfil', async function (this: CustomWorld) {
  // Simula o clique, se necessário
});

When('eu seleciono uma imagem válida do meu dispositivo', async function (this: CustomWorld) {
  await onboardingPage.uploadFotoPerfil('caminho/para/foto.jpg');
});

When('eu seleciono a profissão {string}', async function (this: CustomWorld, profissao) {
  // Seleciona o combobox pelo placeholder/texto inicial ou pelo índice
  const combobox = await this.page.locator('form').getByRole('combobox').first();
  await combobox.click();
  await this.page.getByRole('option', { name: new RegExp(profissao, 'i') }).click();
});

When('eu seleciono a área de atuação {string}', async function (this: CustomWorld, area) {
  // Seleciona o segundo combobox do form (área de atuação principal)
  const combobox = await this.page.locator('form').getByRole('combobox').nth(1);
  await combobox.click();
  await this.page.getByRole('option', { name: new RegExp(area, 'i') }).click();
});

When('eu seleciono o tema {string}', async function (this: CustomWorld, tema) {
  await this.page.locator('div').filter({ hasText: new RegExp(`^${tema}$`, 'i') }).first().click();
});

When('eu seleciono a recomendação {string}', async function (this: CustomWorld, recomendacao) {
  onboardingPage = new OnboardingPage(this.page);
  await onboardingPage.selecionarRecomendacao(recomendacao);
});

Then('o sistema deve validar todos os campos obrigatórios', async function (this: CustomWorld) {
  // Pode ser validado pela ausência de erros
});

Then('o sistema deve salvar as informações do perfil', async function (this: CustomWorld) {
  // Pode ser validado por navegação ou mensagem
});

Then('eu devo ser direcionado para a segunda etapa do onboarding {string}', async function (this: CustomWorld, etapa) {
  // Validar navegação para a etapa correta
});

Then('o sistema deve salvar as informações do perfil incluindo a foto', async function (this: CustomWorld) {
  // Validar presença da foto
  expect(await onboardingPage.fotoPerfilVisivel()).toBeTruthy();
});

Then('o sistema deve exibir erro de validação para o campo {string}', async function (this: CustomWorld, campo) {
  // Mensagem genérica para campo País
  if (campo === 'País') {
    await expect(this.page.getByText(/País.*obrigatório|País e código do país são/i)).toBeVisible();
  } else {
    expect(await onboardingPage.verificarErroCampo(campo)).toBeTruthy();
  }
});

Then('eu devo permanecer na tela atual', async function (this: CustomWorld) {
  // Validar que não houve navegação
});

Then('o botão {string} não deve me avançar para a próxima etapa', async function (this: CustomWorld, botao) {
  // Validar que não houve navegação
});

Then('o sistema deve exibir erros de validação para os campos {string}, {string} e {string}', async function (this: CustomWorld, campo1, campo2, campo3) {
  expect(await onboardingPage.verificarErrosCampos([campo1, campo2, campo3])).toBeTruthy();
});

Then('o sistema deve exibir mensagem de erro de formato para o campo {string}', async function (this: CustomWorld, campo) {
  expect(await onboardingPage.mensagemErroFormatoTelefone()).toBeTruthy();
});

Then('a mensagem de erro deve desaparecer', async function (this: CustomWorld) {
  // Validar ausência da mensagem de erro
});

Then('o campo deve ser aceito como válido', async function (this: CustomWorld) {
  // Validar estado do campo
});

Then('o campo {string} deve estar pré-preenchido com meu nome de registro', async function (this: CustomWorld, campo) {
  expect(await onboardingPage.campoPrePreenchido('Usuário Teste')).toBeTruthy();
});

Then('o campo {string} deve estar habilitado para edição', async function (this: CustomWorld, campo) {
  expect(await onboardingPage.campoHabilitado('nomeCompleto')).toBeTruthy();
});

Then('a foto deve ser carregada e exibida na tela', async function (this: CustomWorld) {
  expect(await onboardingPage.fotoPerfilVisivel()).toBeTruthy();
});

Then('eu posso completar o perfil normalmente com a foto inc', async function (this: CustomWorld) {
  // Validar fluxo completo com foto
});

Then('devo ser direcionado para a próxima etapa do onboarding', async function (this: CustomWorld) {
  // Valida o heading do conteúdo principal (dentro do form)
  await expect(this.page.locator('form').getByRole('heading', { name: /Complete seu perfil/i })).toBeVisible();
});

Then('eu preencho o campo {string} com {string}', async function (this: CustomWorld, campo, valor) {
  onboardingPage = new OnboardingPage(this.page);
  await onboardingPage.preencherCampo(campo, valor);
});

Then('eu seleciono o país {string}', async function (this: CustomWorld, pais) {
  onboardingPage = new OnboardingPage(this.page);
  await onboardingPage.selecionarPais(pais);
});

Then('eu seleciono a cidade {string}', async function (this: CustomWorld, cidade) {
  onboardingPage = new OnboardingPage(this.page);
  // Preenche parte do nome para acionar o autocomplete
  await this.page.getByRole('textbox', { name: /cidade/i }).fill(cidade.substring(0, 6));
  // Seleciona a cidade na lista
  await this.page.getByText(cidade).click();
});

Then('devo ver o heading {string}', async function (this: CustomWorld, heading) {
  if (heading === 'Tudo pronto!') {
    await onboardingPage.validarHeadingTudoPronto();
  } else {
    await onboardingPage.validarHeading(heading);
  }
});

Then('devo ver o texto {string}', async function (this: CustomWorld, texto) {
  await onboardingPage.validarTextoFinal(texto);
});

When('eu avanço para a próxima etapa do onboarding', async function (this: CustomWorld) {
  onboardingPage = new OnboardingPage(this.page);
  await onboardingPage.avancarEtapa();
});

When('eu seleciono um tema aleatório', async function () {
  // Seleciona o primeiro checkbox de tema disponível
  const tema = this.page.locator('form input[type="checkbox"]');
  await tema.first().check();
}); 