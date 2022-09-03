# PlayVox Coding Exam

This is Jayson Labarrete's answer to the coding exam given by Playvox.
This covers both UI Test and API test questions.

The resources I used for testing are the following:

**UI** - https://demo.guru99.com/V4/

**API** - https://restful-booker.herokuapp.com

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

        username=Mngr436006

        password=EdAzYna

        testpassword=Test@123

## Installation

Install playvoxTest with npm

```bash
npm i

```

## Running Tests

**UI Test**

```bash
  1. Go to the ./Playvox/playvoxTest/uiTests folder
  2. run 'npm i'
  3. run 'npx playwright test --headed'
```

**API Test**

```bash
  1. Go to the .Playvox/playvoxTest/apiTests folder
  2. run 'npm i'
  3. run 'npm test'

```

## Tech Stack

**UI:** Playwright using Typescript

**pkgs**: [1]faker.js - to generate random data, [2] playwright-expect - this package tries to provide a bunch of utility functions to perform assertions easier.

**API:** Supertest

**pkgs**: [1] mocha - is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun, [2]Chai - is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework
