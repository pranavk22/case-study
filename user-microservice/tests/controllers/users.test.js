const chai = require("chai");
const faker = require("faker");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chaiHttp = require("chai-http");
const rewire = require("rewire");
const { expect } = chai;

const User = require("../../models/user");
const userController = rewire("../../controller/users.js");

chai.use(sinonChai);

let sandbox = null;
const server = require("../../app");

chai.use(chaiHttp);

chai.use(chaiHttp);
describe("Users controller", () => {
  let req = {
    user: {
      id: faker.random.number(),
    },
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  };
  let res = {
    json: function () {
      return this;
    },
    status: function () {
      return this;
    },
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("signIn", () => {
    it("should return fake token and user using rewire", async () => {
      sandbox.spy(res, "json");
      sandbox.spy(res, "status");

      // fake jwt token with rewire
      let signToken = userController.__set__(
        "signToken",
        (user) => "fakeToken"
      );

      try {
        await userController.signIn(req, res);

        expect(res.json).to.have.been.calledWith({
          token: "fakeToken",
          newUser: req.user,
        });
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe("signUp", () => {
    it("should return 403 if the user is already save in the db.", async () => {
      sandbox.spy(res, "json");
      sandbox.spy(res, "status");
      sandbox.stub(User, "findOne").returns(
        Promise.resolve({
          id: faker.random.number(),
        })
      );

      try {
        await userController.signUp(req, res);

        expect(res.status).to.have.been.calledWith(403);
        expect(res.json).to.have.been.calledWith({
          error: "Email is already in use",
        });
      } catch (error) {
        throw new Error(error);
      }
    });

    it("should return 200 if user is not in db and it was saved", async () => {
      sandbox.spy(res, "json");
      sandbox.spy(res, "status");
      sandbox.stub(User, "findOne").returns(Promise.resolve(false));
      sandbox.stub(User.prototype, "save").returns(
        Promise.resolve({
          id: faker.random.number(),
        })
      );

      try {
        await userController.signUp(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      } catch (error) {
        throw new Error(error);
      }
    });

    it("should return 200 if user is not in db using callback done", async () => {
      sandbox.spy(res, "json");
      sandbox.spy(res, "status");
      sandbox.stub(User, "findOne").returns(Promise.resolve(false));
      sandbox.stub(User.prototype, "save").returns(
        Promise.resolve({
          id: faker.random.number(),
        })
      );

      try {
        await userController.signUp(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      } catch (error) {
        throw new Error(error);
      }
    });

    it("should return fake token in res.json", async () => {
      sandbox.spy(res, "json");
      sandbox.spy(res, "status");
      sandbox.stub(User, "findOne").returns(Promise.resolve(false));
      sandbox.stub(User.prototype, "save").returns(
        Promise.resolve({
          id: faker.random.number(),
        })
      );

      let signToken = userController.__set__(
        "signToken",
        (user) => "fakeTokenNumberTwow"
      );

      try {
        await userController.signUp(req, res);
        expect(res.json).not.null;
        signToken();
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
