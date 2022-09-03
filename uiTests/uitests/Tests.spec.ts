import { test, expect } from '@playwright/test';
import { matchers } from 'playwright-expect';
import { User } from './data/user';
import { AddCustomerPage } from './pages/addcustomer.page';
import { EditCustomerPage } from './pages/editCustomer.page';
import { LoginPage } from './pages/login.page';

let testUser :User

//add custom matchers
// expect.extend(matchers);

test.beforeEach(async({page}) => {
    testUser = new User().generateRandomUser();
    const loginPage = new LoginPage(page);
    await loginPage.goTo()
    await loginPage.login()
})

test('Happy Path - access and update consumer details', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomer(testUser)
  
})

test('Negative Path - remove customer data to replace it with blank data', async ({page}) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsBlank()
  await expect(await page.locator('text=Address Field must not be blank')).toBeVisible()
  await expect(await page.locator('text=City Field must not be blank')).toBeVisible()
  await expect(await page.locator('text=State must not be blank')).toBeVisible()
  await expect(await page.locator('text=PIN Code must not be blank')).toBeVisible()
  await expect(await page.locator('text=Mobile no must not be blank')).toBeVisible()
  await expect(await page.locator('text=Email-ID must not be blank')).toBeVisible()  
})

test('Negative Path - update customer data with special characters', async ({page}) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsSpecialChar()
  await expect(await page.locator('text=Special characters are not allowed').count()).toEqual(5)
})

test('Negative Path - update customer data with numbers', async ({page}) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsNumber(testUser)
  await expect(await page.locator('text=Numbers are not allowed').count()).toEqual(2)
})

test('Negative Path - update customer data with emoji', async ({page}) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsEmoji()
  await expect(await page.locator('text=Numbers are not allowed').count()).toEqual(2)
  await expect(await page.locator('text=Characters are not allowed').count()).toEqual(2)
})
