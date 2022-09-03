import { Page } from "@playwright/test";
import { User } from "../data/user";
require('dotenv').config()

let customerID;

export class AddCustomerPage {
    readonly page: Page;
    constructor (page: Page) {
        this.page = page;
}

customerNameField = () => this.page.locator(`input[name='name']`)
dobField = () => this.page.locator(`input#dob`)
addressField = () =>this.page.locator(`textarea[name='addr']`)
cityField = () => this.page.locator(`input[name='city']`)
stateField = () => this.page.locator(`input[name='state']`)
pinField = () => this.page.locator(`input[name='pinno']`)
mobileField = () => this.page.locator(`input[name='telephoneno']`)
emailField = () => this.page.locator(`input[name='emailid']`)
passwordField = () => this.page.locator(`input[name='password']`)
submitBtn = () => this.page.locator(`input[name='sub']`)
customerIdField = () => this.page.locator(`tr:nth-of-type(4) > td:nth-of-type(2)`) 

async addCustomer(user:User) {
    await this.page.locator(`text="New Customer"`).click()

    await this.customerNameField().fill(user.customerName)
    await this.page.locator(`tr:nth-of-type(5) > td:nth-of-type(2) > input:nth-of-type(2)`).click()
    await this.page.locator('input[name="dob"]').fill('2022-09-03');
    await this.addressField().fill(user.address)
    await this.cityField().fill(user.city)
    await this.stateField().fill(user.state)
    await this.pinField().fill(user.pin)
    await this.mobileField().fill(user.mobile)
    await this.emailField().fill(user.email)
    await this.passwordField().fill(`${process.env.testpassword}`)
    await this.submitBtn().click()
}

async getCustomerID(){
    await this.page.waitForSelector('"Customer Registered Successfully!!!"', {
        state: 'visible',
      });
     customerID = (await this.customerIdField().innerText()).toString()
    return customerID
}
}

export {customerID}
