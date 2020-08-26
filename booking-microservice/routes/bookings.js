const router = require("express-promise-router")();
const BookingsController = require("../controller/bookings");

router
  .route("/")
  .get(BookingsController.getAllBookings)
  .post(BookingsController.addNewBooking);

router
  .route("/:bookingId")
  .get(BookingsController.getBookingById)
  .delete(BookingsController.cancelBooking);

router
  .route("/:userDetailId/flights")
  .get(BookingsController.getUserDetailFlights);
module.exports = router;
