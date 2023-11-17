import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'template',
      testMatch: ['/tests/_template/*.spec.ts']
    },
    {
      name: 'api',
      testMatch: ['/tests/API/*.spec.ts']
    },
    {
      name: 'e2e',
      testMatch: ['/tests/E2E/*.spec.ts']
    }
  ],
  timeout: 10 * 60 * 1000, // 10 minutes
  expect: { 
    timeout: 120000 
  },
  globalSetup: 'utils/globalSetup.ts',
  use: {
    actionTimeout: 120000,
    navigationTimeout: 120000,
    screenshot: 'only-on-failure',
    video: {
      mode: 'retain-on-failure',
      size: {
        width: 1920,
        height: 1080
      }
    },
    contextOptions: {
      recordVideo: {
        dir: './test-results/videos/',
        size: {
          width: 1920,
          height: 1080
        }
      },
      colorScheme: 'dark',
      serviceWorkers: 'allow'
    }
  }
};

export default config;