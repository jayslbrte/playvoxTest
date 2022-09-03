import {faker} from '@faker-js/faker';

export class User {
    customerName : string;
    gender: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    mobile: string;
    email: string;

    constructor() {
        this.customerName = ''
        this.gender = ''
        this.dob = ''
        this.address = ''
        this.city = ''
        this.state = ''
        this.pin = ''
        this.mobile = ''
        this.email = ''
    }

    generateRandomUser(): User {
        const user = new User();
        user.customerName = `${faker.name.firstName()} ${faker.name.lastName()}` 
        user.gender = faker.name.gender()
        user.dob = faker.date.birthdate().toString()
        user.address = `${faker.address.buildingNumber()} ${faker.address.street()}`
        user.city = faker.address.cityName()
        user.state = faker.address.state()
        user.pin = faker.phone.number(`######`)
        user.mobile = faker.phone.number(`+0478######`)
        user.email = faker.internet.email()
        return user;
    }


}