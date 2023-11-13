import { expect, test } from "@playwright/test";


test.describe('', () => {

  test.beforeAll(async ()=> {
    
  });

  test.afterAll(async () => {

  });

  test('', async ({page}) => {

    await test.step('', async () => {
      console.log(process.env.ENV_NAME)
      expect(true).toBe(true)
    });
    
  });

});