import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

export interface CustomWorld extends World {
  page: Page;
}

export class CustomWorldImpl extends World implements CustomWorld {
  page!: Page;
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorldImpl); 