import { Page, expect } from "@playwright/test";
const chalk = require('chalk');

export const color = {
  assert: chalk.hex('#0EFFCE'),
  success: chalk.bold.hex('#0EF15D'),
  error: chalk.bold.hex('#E4271B'),
  warning: chalk.bold.hex('#FFA500'),
  info: chalk.hex('#A020F0'),
  outgoingRequest: chalk.hex('#0560fc'),
  incomingRequest: chalk.hex('#fcf805'),
  request: chalk.hex('#0560fc'),
  response: chalk.hex('#fcf805'),
  dbQuery: chalk.hex('#30CAD2'),
  dbResult: chalk.hex('#1BDDA8')
};

export async function logger(page: Page){
  page.on('request', request => 
    console.log(color.outgoingRequest('>>', request.method(), request.url()))
  );
  page.on('response', response =>
    console.log(color.incomingRequest('<<', response.status(), response.url()))
  );
  page.on('console', msg => {
    if(msg.type() == 'error'){
      console.log(color.error(msg.text));
    }
  });
};

export async function getNetworkResponse(page: Page, URL: string, statusCode: number) {
  try {
    console.log(color.outgoingRequest(`Waiting for network request with URL: ${URL}`));

    const [resp] = await Promise.all([
      page.waitForResponse(r => 
        r.url().includes(URL)
      )
    ]);

    let status = await resp.status();
    let response = await resp.json();

    if(response.status() !== statusCode) {
      console.warn(color.response(`
        \n<<< RESPONSE <<<
        \nRequest URL: ${URL} 
        \nResponse status code: ${status}
        \nResponse body:
        \n${JSON.stringify(response, null, 2)}`));
    };

    await expect(status).toEqual(statusCode);

    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};