const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const { expect } = chai;

const server = require("../../app");

chai.use(chaiHttp);

let token;

describe("Users route", () => {
  const signup = "/signup";
  const signin = "/signin";
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const preSave = {
    email: "mr.sometest@gmail.com",
    password: faker.internet.password(),
  };

  before(async (done) => {
    const result = await chai.request(server).post(signup).send(preSave);
    expect(result.status).to.equal(200);
    token = result.body.token;
    done();
  });

  // after all test have run we drop our test database
  after("dropping test db", async () => {
    await mongoose.connection.dropDatabase(() => {
      console.log("\n Test database dropped");
    });
    await mongoose.connection.close();
  });

  describe("signup", () => {
    it("should create new user if email not found", async () => {
      try {
        const result = await chai.request(server).post(signup).send(user);
        expect(result.body).not.to.be.empty;
        expect(result.body).to.have.property("token");
      } catch (error) {
        console.log(error);
      }
    });

    it("should return 403 if email was found", async () => {
      try {
        await chai.request(server).post(signup).send(preSave);
      } catch (error) {
        expect(error.status).to.equal(403);
        expect(error.response.text).to.equal(
          '{"error":"Email is already in use"}'
        );
      }
    });
  });

  describe("signin", () => {
    it("should return error 400 if user email and password empty", async () => {
      let user = {};
      try {
        const result = await chai.request(server).post(signin).send(user);
      } catch (error) {
        expect(error.status).to.be.equal(400);
      }
    });

    it("should return 200 and our token", async () => {
      try {
        const result = await chai.request(server).post(signin).send(user);

        expect(result.status).to.be.equal(200);
        expect(result.body).not.to.be.empty;
        expect(result.body).to.have.property("token");
      } catch (error) {
        expect(result.status).to.be.equal(400);
      }
    });
  });
});
