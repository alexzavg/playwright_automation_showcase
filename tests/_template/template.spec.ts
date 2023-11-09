import { expect, test } from "@playwright/test";


test.describe('suite', () => {

  test.beforeAll(async ()=> {
    
  });

  test.afterAll(async () => {

  });

  test('test', async ({page}) => {

    await test.step('test step', async () => {
      expect(true).toBe(true)
    });
    
  });

});