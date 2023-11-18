import { test, expect } from "@playwright/test";
import { DataGenerator } from "../../Services/DataGenerator";
import { AutomationPracticeAPI } from "../../Services/AutomationPracticeAPI";


test.describe('API Tests', () => {

  const dataGenerator = new DataGenerator();
  const api = new AutomationPracticeAPI();

  var email, password;

  test('Test Case 1: Get Products List', async () => {
    const response = await api.getProducts();
    expect(response.products.length).toBeGreaterThan(0);
  });

  test('Test Case 2: Search Products', async () => {
    const response = await api.searchProduct('Men Tshirt');
    expect(response.products[0].name).toBe('Men Tshirt');
  });

  test('Test Case 3: Register & Check User', async () => {
    email = await dataGenerator.randomEmail();
    password = await dataGenerator.randomString(10);

    test.step('Register user', async () => {
      const response = await api.registerUser(email, password);
      expect(response.message).toBe('User created!');
    });

    test.step('Check user by credentials', async () => {
      const response = await api.verifyLogin(email, password);
      expect(response.message).toBe('User exists!');
    });

  });

});