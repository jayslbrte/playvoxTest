import supertest from "supertest";
import { expect } from "chai";
import { it } from "mocha";
require("dotenv").config();
import { faker } from "@faker-js/faker";
import moment from "moment";

const request = supertest("https://restful-booker.herokuapp.com");
let token;
let bookingId;

//These are the parameters that are used for the request body
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let checkinDate = moment().format("YYYY-MM-DD");
let checkoutDate = moment().add(10, "days").format("YYYY-MM-DD");

describe("API Testing", function (done) {
  it("Generate Token", function () {
    return request
      .post("/auth")
      .send({
        username: `${process.env.user}`,
        password: `${process.env.pword}`,
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        token = res.body.token;
        console.log(`token:  ${token}`);
      });
  });

  //this is the happy path that triggers response code 200
  it("Create Booking - statuscode 200", function () {
    return request
      .post("/booking")
      .send({
        firstname: firstName,
        lastname: lastName,
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
        console.log(`bookingId: ${bookingId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.bookingid).is.not.null;
      });
  });

  it("Get booking ", function () {
    console.log(`bookingId-GET :   ${bookingId}`);
    return request
      .get(`/booking/${bookingId}`)
      .send()
      .set("Accept", "*/*")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.firstname).to.equal(firstName);
        expect(res.body.lastname).to.equal(lastName);
        expect(res.body.totalprice).to.equal(11);
        expect(res.body.bookingdates.checkin).to.equal(checkinDate);
        expect(res.body.bookingdates.checkout).to.equal(checkoutDate);
        expect(res.body.additionalneeds).to.equal("Breakfast");
      });
  });

  //the request body has no firstname that results to error 500
  it("Create Booking - 500", function () {
    return request
      .post("/booking")
      .send({
        lastname: lastName,
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
      firstname: firstName,
      lastname: lastName,
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
      expect(res.statusCode).to.equal(404);
    });
});
//this retrieves the record using the booking ID that was created from "Create Booking - statuscode 200"
