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

module.exports = router;
