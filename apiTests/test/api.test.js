import supertest from "supertest";
import { expect } from "chai";
import { it } from "mocha";
require("dotenv").config();
import { faker } from "@faker-js/faker";
import moment from "moment";
moment().format();
const request = supertest("https://restful-booker.herokuapp.com");
let token;
let bookingId;

//These are the parameters that are used for the request body
let firstname = faker.name.firstName();
let lastname = faker.name.lastName();
let checkinDate = moment().format("YYYY-MM-DD");
let checkoutDate = moment().add(10, "days").format("YYYY-MM-DD");

describe("API Testing", function (done) {
  it.only("Generate Token", function () {
    return request
      .post("/auth")
      .send({
        username: `${process.env.user}`,
        password: `${process.env.pword}`,
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        token = res.body.token;
        console.log(token);
      });
  });

  //this is the happy path that triggers response code 200
  it("Create Booking - 200", function () {
    return request
      .post("/booking")
      .send({
        firstname: firstname,
        lastname: lastname,
        totalprice: 11,
        depositpaid: true,
        bookingdates: {
          checkin: checkinDate,
          checkout: checkoutDate,
        },
        additionalneeds: "Breakfast",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "*/*")
      .then((res) => {
        bookingId = res.body.bookingid;
        console.log(bookingId);
        expect(res.statusCode).to.equal(200);
        expect(res.body.bookingid).is.not.null;
      });
  });
  //the request body has no firstname that results to error 500
  it("Create Booking - 500", function () {
    return request
      .post("/booking")
      .send({
        lastname: lastname,
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: checkinDate,
          checkout: checkoutDate,
        },
        additionalneeds: "Breakfast",
      })
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).to.equal(500);
      });
  });
});
//the request has invalid endpoint that results to 404
it("Create Booking - 404", function () {
  return request
    .post("/bookin")
    .send({
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2021-01-01",
        checkout: "2022-01-01",
      },
      additionalneeds: "Breakfast",
    })
    .set("Content-Type", "application/json")
    .then((res) => {
      expect(res.statusCode).to.equal(404);
    });
});

it("Get booking ", function () {
  return request
    .post(`/booking/${bookingId}`)
    .send()
    .set("Content-Type", "application/json")
    .set("Accept", "*/*")
    .then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.body.firstname).to.equal(firstname);
      expect(res.body.lastname).to.equal(lastname);
      expect(res.body.totalprice).to.equal(11);
      expect(res.body.bookingdates.checkin).to.equal(checkinDate);
      expect(res.body.bookingdates.checkout).to.equal(checkoutDate);
      expect(res.body.additionalneeds).to.equal("Breakfast");
    });
});
