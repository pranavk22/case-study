const router = require("express-promise-router")();
const UserController = require("../controller/users");
const passport = require("passport");
require("../passport");
const authenticate = (strategy) =>
  passport.authenticate(`${strategy}`, { session: false });

router.route("/signup").post(UserController.signUp);

router.route("/signin").post(authenticate("local"), UserController.signIn);

router.route("/secret").get(authenticate("jwt"), UserController.secret);

router
  .route("/google")
  .post(authenticate("googleToken"), UserController.googleOAuth);

// router
//   .route("/google/callback")
//   .get(
//     passport.authenticate("google", { failureRedirect: "/signin" }),
//     function (req, res) {
//       // Successful authentication, redirect home.
//       const token = signToken(req.user);
//       res.status(200).send("Hi " + req.user.google.displayName);

//       // res.status(200).json({ token });
//     }
//   );

router
  .route("/facebook")
  .post(authenticate("facebookToken"), UserController.googleOAuth);

// router
//   .route("/facebook/callback")
//   .get(
//     passport.authenticate("facebook", { failureRedirect: "/signin" }),
//     function (req, res) {
//       // Successful authentication, redirect home.
//       const token = signToken(req.user);
//       // res.status(200).send("Hi ");
//       // console.log(req);
//       // res.redirect("/");

//       res.status(200).json({ token });
//     }
//   );

module.exports = router;
