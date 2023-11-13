import { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright.config';

const config: PlaywrightTestConfig = {
  ...base,
  fullyParallel: false,
  timeout: 10 * 90 * 1000, // 15 minutes
  workers: 1,
  retries: 0,
  reporter: [
    //['list'],
    ['playwright-html', { 
      testFolder: 'tests',
      title: 'Playwright HTML Report',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'html-report',
      minifyAssets: true,
      startServer: false
    }]
  ],
  use: {
    ...base.use,
    headless: false,
    viewport: { width: 1920, height: 1080 },
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