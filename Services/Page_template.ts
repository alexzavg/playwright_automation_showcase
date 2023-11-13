// Documentation https://playwright.dev/docs/api/class-apirequestcontext
import { Page } from '@playwright/test';
import { PageActions } from '../Pages/PageActions.page';


export class PageTemplate extends PageActions {

  readonly page: Page;
  readonly el: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.el = '';
  };

  public async registerUser(url: string) {
    await this.openUrl(url);
  };

};