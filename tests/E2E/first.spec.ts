import { expect, test } from "@playwright/test";


test.describe('suite', () => {

  test.beforeAll(async () => {
    console.log(process.env.ENV_NAME)
  });

  test.afterAll(async () => {
    console.log(`That's all, folks!`)
  });

  test('pass', async ({page}) => {
    expect(true).toBe(true)
  });

  test('fail', async ({page}) => {
    expect(false).toBe(true)
  });

});