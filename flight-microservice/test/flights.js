const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");
const { expect } = require("chai");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("Flights API", () => {
  /**
   * Test the GET route
   */

  describe("GET flights", () => {
    it("It should GET all the flights", (done) => {
      chai
        .request("http://localhost:9000/flights")
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
    it("It should NOT GET all the flights", (done) => {
      chai
        .request("http://localhost:9000/flightss")
        .get("/")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET(by ID) route
   */
  describe("GET flights/:_id", () => {
    it("It should GET a flight by id", (done) => {
      const id = "5f5080442b4b7f4ecc994396";
      chai
        .request("http://localhost:9000/flights")
        .get("/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("from");
          response.body.should.have.property("to");
          response.body.should.have.property("date");
          response.body.should.have.property("fare");
          response.body.should.have
            .property("_id")
            .eq("5f5080442b4b7f4ecc994396");
          done();
        });
    });
    it("It should NOT GET a flight by id", (done) => {
      const id = "5f462e21e01962aa48722f62";
      chai
        .request("http://localhost:9000/flights")
        .get("/" + id)
        .end((err, response) => {
          expect(response.body).null;
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /api/flights", () => {
    it("It should POST a new flight", (done) => {
      const flight = {
        name: "AI1024",
        airlines: "Air India",
        from: "DEL",
        to: "JAI",
        date: "2020-06-03",
        fare: "4500",
      };
      chai
        .request("http://localhost:9000/flights")
        .post("/")
        .send(flight)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
    it("It should Not POST a new flight without flight_name", (done) => {
      const flight = {
        airlines: "Air India",
        from: "DEL",
        to: "JAI",
        date: "2020-06-03",
        fare: "4500",
      };
      chai
        .request("http://localhost:9000/flights")
        .post("/")
        .send(flight)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /api/flights/:_id", () => {
    it("It should DELETE a flight", (done) => {
      const id = "5f5080442b4b7f4ecc994396";
      chai
        .request("http://localhost:9000/flights")
        .delete("/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("It should Not DELETE a flight that does not exist", (done) => {
      const id = "5f4b92bfe7a737e9a4098af2";
      chai
        .request("http://localhost:9000/flights")
        .delete("/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          expect(response.body).not.equals("Flight deleted");
          done();
        });
    });
  });
});
