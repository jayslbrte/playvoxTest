import supertest from "supertest";
import { expect } from "chai";
import { it } from "mocha";
require("dotenv").config();
const request = supertest("https://restful-booker.herokuapp.com");
let token;

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
        console.log(token);
      });
  });

  it("Create Booking - 200", function () {
    return request
      .post("/booking")
      .send({
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      })
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.bookingid).is.not.null;
      });
  });

  it("Create Booking - 500", function () {
    return request
      .post("/booking")
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
        expect(res.statusCode).to.equal(500);
      });
  });
});

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
