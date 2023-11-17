// Documentation https://playwright.dev/docs/api/class-apirequestcontext
import { Page, request } from "@playwright/test";
import { RequestLogger } from "./RequestLogger";


export class AutomationPracticeAPI extends RequestLogger {

  expectedStatus: number;
  page: Page;
  baseUrlApi: string;

  constructor(expectedStatus: number = 200) {
    super();
    this.expectedStatus = expectedStatus;
    this.baseUrlApi = process.env.BASE_URL_API;
  };
  
  public async getProducts() {
    let resp;
  
    while (true) {
      const context = await request.newContext();
      const url = `${process.env.BASE_URL_API}/productsList`;
  
      const response = await context.get(url);
  
      if(response.status() == this.expectedStatus) {
        resp = await response.json();
        break;
      } else {
        await this.logRequest('GET', url);
        resp = await response.text();
        await this.logResponse(response.status(), resp);
        await this.page.waitForTimeout(5000);
      }
    };
  
    return resp;
  };

  public async searchProduct(productName: string) {
    let resp;
  
    while (true) {
      const context = await request.newContext();
      const url = `${process.env.BASE_URL_API}/searchProduct`;

      const body = {
        search_product: productName
      }
  
      const response = await context.post(url, {
        form: body
      });
  
      if(response.status() == this.expectedStatus) {
        resp = await response.json();
        break;
      } else {
        await this.logRequest('POST', url, body);
        resp = await response.text();
        await this.logResponse(response.status(), resp);
        await this.page.waitForTimeout(5000);
      }
    };
  
    return resp;
  };

  public async registerUser(email: string, password: string) {
    let resp;
  
    while (true) {
      const context = await request.newContext();
      const url = `${process.env.BASE_URL_API}/createAccount`;

      const body = {
        name: 'name',
        email: email,
        password: password,
        firstname: 'firstname',
        lastname: 'lastname',
        address1: 'address1',
        country: 'United States',
        state: 'MA',
        city: 'Boston',
        zipcode: '01280',
        mobile_number: '+1234567890'
      }
  
      const response = await context.post(url, {
        form: body
      });
  
      if(response.status() == this.expectedStatus) {
        resp = await response.json();
        break;
      } else {
        await this.logRequest('POST', url, body);
        resp = await response.text();
        await this.logResponse(response.status(), resp);
        await this.page.waitForTimeout(5000);
      }
    };
  
    return resp;
  };

  public async verifyLogin(email: string, password: string) {
    let resp;
  
    while (true) {
      const context = await request.newContext();
      const url = `${process.env.BASE_URL_API}/verifyLogin`;

      const body = {
        email: email,
        password: password
      }
  
      const response = await context.post(url, {
        form: body
      });
  
      if(response.status() == this.expectedStatus) {
        resp = await response.json();
        break;
      } else {
        await this.logRequest('POST', url, body);
        resp = await response.text();
        await this.logResponse(response.status(), resp);
        await this.page.waitForTimeout(5000);
      }
    };
  
    return resp;
  };

};