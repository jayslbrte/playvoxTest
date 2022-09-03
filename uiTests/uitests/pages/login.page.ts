import { Page } from "@playwright/test";
require('dotenv').config()


export class LoginPage {
    readonly page: Page;
    constructor (page: Page) {
        this.page = page;
}

userField = () => this.page.locator(`input[name='uid']`)
passwordField = () => this.page.locator(`input[name='password']`)
submitBtn = () => this.page.locator(`input[name='btnLogin']`)

async goTo() {
    await this.page.goto('https://demo.guru99.com/V4/');
    await this.page.waitForLoadState('networkidle');
}

async login(){
    await this.userField().fill(`${process.env.username}`)
    await this.passwordField().fill(`${process.env.password}`)
    await this.submitBtn().click()
}

}
