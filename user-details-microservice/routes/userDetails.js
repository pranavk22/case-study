const router = require("express-promise-router")();
const UserDetailsController = require("../controller/userDetails");

router
  .route("/:userId")
  .get(UserDetailsController.getAllUserDetails)
  .post(UserDetailsController.addNewUserDetail);

router
  .route("/:userDetailId")
  .get(UserDetailsController.getUserDetail)
  .delete(UserDetailsController.deleteUserDetail)
  .put(UserDetailsController.replaceUserDetail);

// router
//   .route("/:userDetailId/flights")
//   .get(UserDetailsController.getUserDetailFlights);
//   .post(UsersController.addUserFlight);

// router
//   .route("/:userDetailId/flights/:flightId")
//   .post(UsersController.addUserFlightById)
//   .delete(UsersController.cancelUserFlightById);

module.exports = router;
