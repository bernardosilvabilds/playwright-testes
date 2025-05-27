import { Before, After, BeforeAll, AfterAll, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  console.log('Iniciando configuração global...');
  browser = await chromium.launch({
    headless: false
  });
});

Before(async function () {
  console.log('Iniciando novo cenário...');
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: 'test-results/videos/'
    }
  });
  this.page = await context.newPage();
});

After(async function (scenario) {
  console.log('Finalizando cenário...');
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({
      path: `test-results/screenshots/${scenario.pickle.name}-${Date.now()}.png`
    });
    this.attach(screenshot, 'image/png');
  }
  await context.close();
});

AfterAll(async function () {
  console.log('Finalizando configuração global...');
  await browser.close();
});

AfterStep(async function () {
  if (this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
}); 