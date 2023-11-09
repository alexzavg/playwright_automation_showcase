import { color } from "./Common";

export class RequestLogger {

  public async logRequest(requestType: string, url: string, data?: any): Promise<void> {
    console.log(color.request(`\n>>> REQUEST >>>`));
    console.log(color.request(`\nRequest type: ${requestType}`));
    console.log(color.request(`\nRequest URL: ${url}`));
    if (data) {
      console.log(color.request(`\nRequest body: \n` + JSON.stringify(data, null, 2)));
    }
  };

  public async logResponse(status: any, data?: any): Promise<void> {
    console.log(color.response(`\n<<< RESPONSE <<<`));
    console.log(color.response(`\nResponse status code: ${status}`));
    console.log(color.response(`\nResponse body: ` + '\n' + JSON.stringify(data, null, 2)));
  };

};