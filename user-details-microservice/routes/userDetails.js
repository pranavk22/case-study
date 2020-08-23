const router = require("express-promise-router")();
const UserDetailsController = require("../controller/userDetails");

router
  .route("/")
  .get(UserDetailsController.getAllUsers)
  .post(UserDetailsController.addNewUser);

router
  .route("/:userId")
  .get(UserDetailsController.getUser)
  .delete(UserDetailsController.deleteUser)
  .put(UserDetailsController.replaceUser);

router.route("/:userId/flights").get(UserDetailsController.getUserFlights);
//   .post(UsersController.addUserFlight);

// router
//   .route("/:userId/flights/:flightId")
//   .post(UsersController.addUserFlightById)
//   .delete(UsersController.cancelUserFlightById);

module.exports = router;
