import { Page, expect, test } from "@playwright/test";

export class PageActions {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  public async openUrl(url: string) {
    await test.step(`Navigate to URL: '${url}'`, async () => {
      await this.page.goto(url);
    });
  };

  public async refreshPage() {
    await test.step(`Refresh page`, async () => {
      await this.page.reload();
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
    });
  };

  public async waitForUrl(url: string) {
    await test.step(`Wait until page URL is: '${url}'`, async () => {
      await this.page.waitForURL(url);
      await this.page.waitForLoadState('load');
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(500);
    });
  };

  public async waitForElement(locator: string) {
    await test.step(`Wait until element: '${locator}' is visible`, async () => {
      await this.page.waitForSelector(locator);
    });
  };

  public async waitForElementInvisible(locator: string) {
    await test.step(`Wait until element: '${locator}' is invisible`, async () => {
      await expect(this.page.locator(locator)).not.toBeVisible();
    });
  };

  public async waitForElementEnabled(locator: string) {
    await test.step(`Wait until element: '${locator}' doesn't have "disabled" attribute`, async () => {
      await expect(this.page.locator(locator)).toBeEnabled();
    });
  };

  public async waitForElementEditable(locator: string) {
    await test.step(`Wait until element: '${locator}' doesn't have "readonly" property`, async () => {
      await expect(this.page.locator(locator)).toBeEditable();
    });
  };

  public async clickElement(locator: string) {
    await test.step(`Click element locator: '${locator}'`, async () => {
      await this.page.locator(locator).click();
    });
  };

  public async clickElementForce(locator: string) {
    await test.step(`Click element locator: '${locator}'`, async () => {
      await this.page.locator(locator).click({
        button: 'middle',
        clickCount: 10,
        delay: 250
      });
    });
  };

  public async clickElementCentre(locator: string) {
    await test.step(`Click element locator: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      const box = await selector.boundingBox();
      // await selector.scrollIntoViewIfNeeded();
      await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    });
  };

  public async fillElement(locator: string, text: string) {
    await test.step(`Fill element locator: '${locator}' with text: '${text}'`, async () => {
      const selector = this.page.locator(locator);
      await selector.fill(text);
    });
  };

  public async pressKey(key: string) {
     await test.step(`Press '${key}' key`, async () => {
      await this.page.keyboard.press(key);
    });
  };

  public async checkElementAttribute(locator: string, attr: string, value: string) {
    await test.step(`Get attribute: '${attr}' from element: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      const attribute = await selector.getAttribute(attr);
      await expect(attribute).toEqual(value);
    });
  };

  public async waitForElementAttribute(locator: string, attr: string, value: string, timeout = 60000) {
    await test.step(`Check element '${locator}' for attribute '${attr}'`, async () => {
      const interval = 500;
      let elapsedTime = 0;
      while (elapsedTime < timeout) {
          console.log(`Checking element '${locator}' for attribute '${attr}'`);
          try {
              const selector = this.page.locator(locator);
              const attribute = await selector.getAttribute(attr);
              expect(attribute).toContain(value);
              return;
          } catch (error) {
              await new Promise(resolve => setTimeout(resolve, interval));
              elapsedTime += interval;
          }
      }
      throw new Error(`Timeout of ${timeout}ms reached while waiting for attribute '${attr}' with value '${value}' on element '${locator}'`);
    });
  };

  public async checkElementText(locator: string, text: string) {
    await test.step(`Check text from element with locator: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      const textValue = await selector.textContent();
      await expect(textValue).toEqual(text);
    });
  };

  public async getElementText(locator: string) {
    let text;
    await test.step(`Get text from element with locator: '${locator}'`, async () => {
      const selector = this.page.locator(locator);
      text = await selector.textContent();
    });
    return text as string;
  };

  public async selectDropdownOption(locator: string, option: string) {
    await test.step(`Select '${option}' from dropdown with locator '${locator}'`, async () => {
      await this.page.locator(locator).selectOption(option);
    });
  };

  public async checkCheckbox(locator: string) {
    await test.step(`Check checkbox with locator '${locator}'`, async () => {
      await this.page.locator(locator).check();
      await expect(this.page.locator(locator)).toBeChecked();
    });
  };

  public async isCheckboxChecked(locator: string) {
    await test.step(`Check checkbox with locator '${locator}'`, async () => {
      await expect(this.page.locator(locator)).toBeChecked();
    });
  };

  public async uncheckCheckbox(locator: string) {
    await test.step(`Uncheck checkbox with locator '${locator}'`, async () => {
      await this.page.locator(locator).uncheck();
      await expect(this.page.locator(locator)).not.toBeChecked();
    });
  };

  public async isCheckboxUnchecked(locator: string) {
    await test.step(`Check checkbox with locator '${locator}'`, async () => {
      await expect(this.page.locator(locator)).not.toBeChecked();
    });
  };

  public async getCookie(URL: string, cookieName: string){
    var cookie = await this.page.context().cookies(URL);
    //console.log("cookie text: " + JSON.stringify(cookie));

    var lengthCookie = cookie.length;
    var valueOfCookie;

    for (var step = 0; step < lengthCookie; step++) {
      if(cookie[step]['name'] === cookieName){
        valueOfCookie = cookie[step]['value'];
        console.log(`Cookie: ${cookieName}=${valueOfCookie}`);
      };
    }

    return `${cookieName}=${valueOfCookie}`;
  };

  public async setCookie(cookieName: string, cookieValue: string) {
    // Set the cookie
    await this.page.evaluate(({ name, value }) => {
      document.cookie = `${name}=${value}`;
    }, { name: cookieName, value: cookieValue });
  
    // Check if the cookie was set
    const cookieSet = await this.page.evaluate((name) => {
      const cookies = document.cookie;
      return cookies.includes(name);
    }, cookieName);
  
    // Throw an error if the cookie wasn't set
    if (!cookieSet) {
      throw new Error(`Cookie "${cookieName}" was not set.`);
    }
  };

};