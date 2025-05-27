export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  headless: boolean;
}

export const environments: Record<string, EnvironmentConfig> = {
  dev: {
    baseUrl: 'https://dev.seu-site.com',
    apiUrl: 'https://api.dev.seu-site.com',
    timeout: 30000,
    headless: true
  },
  test: {
    baseUrl: 'https://test.seu-site.com',
    apiUrl: 'https://api.test.seu-site.com',
    timeout: 30000,
    headless: true
  },
  prod: {
    baseUrl: 'https://seu-site.com',
    apiUrl: 'https://api.seu-site.com',
    timeout: 60000,
    headless: true
  }
};

export function getEnvironment(): EnvironmentConfig {
  const env = process.env.ENV || 'dev';
  return environments[env];
} 