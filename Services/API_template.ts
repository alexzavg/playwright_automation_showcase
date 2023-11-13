// Documentation https://playwright.dev/docs/api/class-apirequestcontext
import { expect, Page, request } from "@playwright/test";
import { RequestLogger } from "./RequestLogger";


export class ApiTemplate extends RequestLogger {

  readonly expectedStatus: number;
  readonly page: Page;

  constructor(expectedStatus: number = 200) {
    super();
    this.expectedStatus = expectedStatus;
  };

  public async getIdentifierInfo(email: string, leadSource: string): Promise<object> {
    return {
      "Email": email,
      "LeadSource": leadSource
    }
  };

  public async getAuth0Token() {
    try{
      const context = await request.newContext();
      const url = `${process.env.AUTH0_URL}/oauth/token`;
  
      const response = await context.post(url, {
        data: {
          "client_id": process.env.AUTH0_CLIENT_ID,
          "client_secret": process.env.AUTH0_CLIENT_SECRET,
          "audience": process.env.AUTH0_AUDIENCE,
          "grant_type": "client_credentials"
        }
      });
  
      let resp = await response.json();
  
      if(response.status() !== 200) {
        await this.logRequest('POST', url);
        await this.logResponse(response.status(), resp);
      };
  
      expect(response.status()).toEqual(this.expectedStatus);
      
      return resp.access_token;
    } catch (err) {
      console.error(err);
      let error = err.toString();
      throw new Error(error);
    }
  };
  
  public async getIdentifier(data: any, auth0Token?: string) {
    let resp;
  
    while (true) {
      const context = await request.newContext();
      const url = `${process.env.AUTH0_AUDIENCE}/getIdentifier`;
  
      const response = await context.post(url, {
        headers: {
          Authorization: `Bearer ${auth0Token}`
        },
        data: data
      });
  
      if(response.status() == this.expectedStatus) {
        resp = await response.json();
        break;
      } else {
        await this.logRequest('POST', url, data);
        resp = await response.text();
        await this.logResponse(response.status(), resp);
        await this.page.waitForTimeout(5000);
      }
    };
  
    return resp.external_id;
  };

};