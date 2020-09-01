const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { response } = require("express");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("Flights API", () => {
  /**
   * Test the GET route
   */

  describe("GET /api/flights", () => {
    it("It should GET all the flights", (done) => {
      chai
        .request("http://localhost:8002")
        .get("/api/flights")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
    it("It should NOT GET all the flights", (done) => {
      chai
        .request("http://localhost:8002")
        .get("/api/flight")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET(by ID) route
   */
  describe("GET /api/flights/:_id", () => {
    it("It should GET a flight by id", (done) => {
      const flightid = "5f462e21e01962aa48722f63";
      chai
        .request("http://localhost:8002")
        .get("/api/flights/" + flightid)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("_id");
          response.body.should.have.property("flight_name");
          response.body.should.have.property("from");
          response.body.should.have.property("to");
          response.body.should.have.property("date");
          response.body.should.have.property("departuretime");
          response.body.should.have.property("arrivaltime");
          response.body.should.have.property("fare");
          response.body.should.have
            .property("_id")
            .eq("5f462e21e01962aa48722f63");
          done();
        });
    });
    it("It should NOT GET a flight by id", (done) => {
      const flightid = "5f462e21e01962aa48722f62";
      chai
        .request("http://localhost:8002")
        .get("/api/flights/" + flightid)
        .end((err, response) => {
          response.should.have.status(404);
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
        flight_name: "DEL-JAI-112",
        from: "Delhi",
        to: "Jaipur",
        date: "2020-06-03",
        departuretime: "18:00",
        arrivaltime: "21:00",
        fare: "4500",
      };
      chai
        .request("http://localhost:8002")
        .post("/api/flights")
        .send(flight)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("flight_name");
          response.body.should.have.property("from");
          response.body.should.have.property("to");
          response.body.should.have.property("date");
          response.body.should.have.property("departuretime");
          response.body.should.have.property("arrivaltime");
          response.body.should.have.property("fare");
          done();
        });
    });
    it("It should Not POST a new flight without flight_name", (done) => {
      const flight = {
        from: "Delhi",
        to: "Jaipur",
        date: "2020-06-03",
        departuretime: "18:00",
        arrivaltime: "21:00",
        fare: "4500",
      };
      chai
        .request("http://localhost:8002")
        .post("/api/flights")
        .send(flight)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  //     /**
  //  * Test the PUT route
  //  */
  // describe("PUT /api/flights/:_id", ()=>{
  //     it("It should PUT a new flight", (done)=>{
  //         const flightid='5f4b92bfe7a737e9a4098af2'
  //         const flight={
  //             _id:'5f4b92bfe7a737e9a4098af2',
  //             flight_name:"DEL-JAI-112",
  //             from:"Delhi",
  //             to:"Jaipur",
  //             date:"2020-06-03",
  //             departuretime:"17:00",
  //             arrivaltime:"21:00",
  //             fare:"4500"
  //         };
  //         chai.request('http://localhost:8002')
  //         .put("/api/flights/" +flightid)
  //         .send(flight)
  //         .end((err,response)=>{
  //             response.should.have.status(200);
  //             response.body.should.be.a('object')
  //             response.body.should.have.property('_id')
  //             response.body.should.have.property('flight_name').eq('DEL-JAI-112')
  //             response.body.should.have.property('from').eq('Delhi')
  //             response.body.should.have.property('to').eq('Jaipur')
  //             response.body.should.have.property('date').eq('2020-06-03')
  //             response.body.should.have.property('departuretime').eq('17:00')
  //             response.body.should.have.property('arrivaltime').eq('21:00')
  //             response.body.should.have.property('fare').eq('4500')
  //             response.body.should.have.property('_id').eq('5f4b92bfe7a737e9a4098af2')
  //             done();
  //             });
  //         });
  //     });

  /**
   * Test the DELETE route
   */
  describe("DELETE /api/flights/:_id", () => {
    it("It should DELETE a flight", (done) => {
      const flightid = "5f4b96240894abc6100e0698";
      chai
        .request("http://localhost:8002")
        .delete("/api/flights/" + flightid)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("It should Not DELETE a flight that does not exist", (done) => {
      const flightid = "5f4b92bfe7a737e9a4098af2";
      chai
        .request("http://localhost:8002")
        .delete("/api/flights/" + flightid)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
