import { expect, Page } from "@playwright/test";
import { User } from "../data/user";
import {customerID } from "../pages/addcustomer.page"
import {faker} from '@faker-js/faker';
require('dotenv').config()



export class EditCustomerPage {
    readonly page: Page;
    constructor (page: Page) {
        this.page = page;
}

customerIdField = () => this.page.locator(`input[name='cusid']`)
submitBtn = () => this.page.locator(`input[name='AccSubmit']`)
editSubmitBtn = () => this.page.locator(`[type='submit']`)
address = () => this.page.locator(`textarea[name='addr']`)
city = () => this.page.locator(`input[name='city']`)
state = () => this.page.locator(`input[name='state']`)
pin = () => this.page.locator(`input[name='pinno']`)
mobile = () => this.page.locator(`input[name='telephoneno']`)
email = () => this.page.locator(`input[name='emailid']`)
addresslabel = () => this.page.locator(`[data-new-gr-c-s-check-loaded] tr:nth-of-type(7) label`)


async updateCustomer(user:User){
    console.log(`user ID : ${customerID}`)
    await this.page.locator(`text="Edit Customer"`).click()
    await this.customerIdField().fill(customerID)
    await this.submitBtn().click()
    await this.address().fill(user.address)
    await this.city().fill(user.city)
    await this.state().fill(user.state)
    await this.pin().fill(user.pin)
    await this.mobile().fill(user.mobile)
    await this.email().fill(user.email)
    await this.editSubmitBtn().click()

//verify that the customer details are updated 
    await this.customerIdField().fill(customerID)
    await this.submitBtn().click()

    const addressSaved = (await this.address().inputValue()).toString()
    await expect(addressSaved).toContain(user.address)

    const citySaved = (await this.city().inputValue()).toString()
    await expect(citySaved).toContain(user.city)

    const stateSaved = (await this.state().inputValue()).toString()
    await expect(stateSaved).toContain(user.state)

    const pinSaved = (await this.pin().inputValue()).toString()
    await expect(pinSaved).toContain(user.pin)

    const mobileSaved = (await this.mobile().inputValue()).toString()
    await expect(mobileSaved).toContain(user.mobile)

    const emailSaved = (await this.email().inputValue()).toString()
    await expect(emailSaved).toContain(user.email)
}

async updateCustomerFieldsBlank(){
    console.log(`user ID : ${customerID}`)
    await this.page.locator(`text="Edit Customer"`).click()
    await this.customerIdField().fill(customerID)
    await this.submitBtn().click()
    await this.address().fill('')
    await this.city().fill('')
    await this.state().fill('')
    await this.pin().fill('')
    await this.mobile().fill('')
    await this.email().fill('')

    await this.page.waitForSelector('p:has-text("Edit Customer")', {
        state: 'visible',
      });
}  

async updateCustomerFieldsNumber(user:User){
    console.log(`user ID : ${customerID}`)
    await this.page.locator(`text="Edit Customer"`).click()
    await this.customerIdField().fill(customerID)
    await this.submitBtn().click()
    await this.address().fill(user.pin)
    await this.city().fill(user.pin)
    await this.state().fill(user.pin)
    await this.pin().fill(user.pin)
    await this.mobile().fill(user.pin)
    await this.email().fill(user.pin)
}  

async updateCustomerFieldsSpecialChar(){
    console.log(`user ID : ${customerID}`)
    const specialChar = `!@#$%^&'`
    await this.page.locator(`text="Edit Customer"`).click()
    await this.customerIdField().fill(customerID)
    await this.submitBtn().click()
    await this.address().fill(specialChar)
    await this.city().fill(specialChar)
    await this.state().fill(specialChar)
    await this.pin().fill(specialChar)
    await this.mobile().fill(specialChar)
    await this.email().fill(specialChar)
}  


async updateCustomerFieldsEmoji(){
    console.log(`user ID : ${customerID}`)
    await this.page.locator(`text="Edit Customer"`).click()
    await this.customerIdField().fill(customerID)
    await this.submitBtn().click()
    await this.address().fill(faker.internet.emoji())
    await this.city().fill(faker.internet.emoji())
    await this.state().fill(faker.internet.emoji())
    await this.pin().fill(faker.internet.emoji())
    await this.mobile().fill(faker.internet.emoji())
    await this.email().fill(faker.internet.emoji())
}  

}
