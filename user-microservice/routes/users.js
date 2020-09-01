const router = require("express-promise-router")();
const UserController = require("../controller/users");
const passport = require("passport");
require("../passport");
const authenticate = (strategy) =>
  passport.authenticate(`${strategy}`, { session: false });

router.route("/signup").post(UserController.signUp);

router.route("/signin").post(authenticate("local"), UserController.signIn);

router
  .route("/google")
  .post(authenticate("googleToken"), UserController.signIn);

router
  .route("/facebook")
  .post(authenticate("facebookToken"), UserController.signIn);

module.exports = router;
