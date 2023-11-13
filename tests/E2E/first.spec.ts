import { expect, test } from "@playwright/test";
import {PageActions} from "../../Pages/PageActions";


test.describe('suite', () => {

  test.beforeAll(async () => {
    console.log(process.env.ENV_NAME)
  });

  test.afterAll(async () => {
    console.log(`That's all, folks!`)
  });

  test('pass', async ({page}) => {
    const pageActions = new PageActions(page)
    await pageActions.openUrl("https://www.google.com")
    expect(true).toBe(true)
  });

  test('fail', async ({page}) => {
    const pageActions = new PageActions(page)
    await pageActions.openUrl("https://www.google.com")
    expect(false).toBe(true)
  });

});