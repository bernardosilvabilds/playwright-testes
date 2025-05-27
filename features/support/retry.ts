import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { World } from '@cucumber/cucumber';
import { test } from '@playwright/test';

class CustomWorld extends World {
  constructor(options: any) {
    super(options);
  }

  async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        if (attempt < maxAttempts) {
          console.log(`Tentativa ${attempt} falhou. Tentando novamente em ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000); // 60 segundos 