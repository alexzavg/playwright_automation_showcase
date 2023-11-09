import { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright.config';

const config: PlaywrightTestConfig = {
  ...base,
  fullyParallel: false,
  timeout: 10 * 90 * 1000, // 15 minutes
  workers: 1,
  retries: 1,
  reporter: [
    ['line', ['html', { outputFolder: 'html-report/e2e', open: 'never' }]]
  ],
  use: {
    ...base.use,
    headless: false,
    viewport: null,
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 250,
      channel: 'chrome',
      args: [
        '--start-maximized',
        '--disable-extensions',
        '--incognito',
        '--test-type=browser',
        '--disable-dev-shm-usage'
      ]
    }
  },
};
export default config;