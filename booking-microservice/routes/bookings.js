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
  .route("/userDetails/:userDetailId")
  .get(BookingsController.getUserDetailBookings);

router.route("/razorpay").post(BookingsController.payment);
router.route("/verification").post(BookingsController.verifyPayment);
module.exports = router;
