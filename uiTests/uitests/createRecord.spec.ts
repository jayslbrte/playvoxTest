import { test, expect } from '@playwright/test';
import { User } from './data/user';
import { AddCustomerPage } from './pages/addcustomer.page';
import { EditCustomerPage } from './pages/editCustomer.page';
import { LoginPage } from './pages/login.page';

let testUser :User

test.beforeAll(() => {
    testUser = new User().generateRandomUser();

})

test('Happy Path - access and update consumer details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo()
  await loginPage.login()
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()

  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomer(testUser)
  
})

test.only('Negative Path - remove customer data and attempt to save', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo()
  await loginPage.login()
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()

  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsBlank()
  await page.pause()
  await expect ((await page.locator('text=Address Field must not be blank')).tobeVisible())
    
})

test('Negative Path - update customer data with special characters', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo()
  await loginPage.login()
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()

  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsSpecialChar()
  
})

test ('Negative Path - update customer data with numbers', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo()
  await loginPage.login()
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()

  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsNumber(testUser)

})

test('Negative Path - update customer data with emoji', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo()
  await loginPage.login()
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.addCustomer(testUser)
  await addCustomerPage.getCustomerID()

  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.updateCustomerFieldsEmoji()
  await page.pause()
})
