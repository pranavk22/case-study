const router = require("express-promise-router")();
const UsersController = require("../controller/users");

router
  .route("/")
  .get(UsersController.getAllUsers)
  .post(UsersController.addNewUser);

router
  .route("/:userId")
  .get(UsersController.getUser)
  .delete(UsersController.deleteUser)
  .put(UsersController.replaceUser);

router.route("/:userId/flights").get(UsersController.getUserFlights);
//   .post(UsersController.addUserFlight);

// router
//   .route("/:userId/flights/:flightId")
//   .post(UsersController.addUserFlightById)
//   .delete(UsersController.cancelUserFlightById);

module.exports = router;
