let Booking = require("../models/booking");
let User = require("../models/userDetails");
let Flight = require("../models/flight");

module.exports = {
  getAllBookings: async (req, res, next) => {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  },

  getBookingById :async (req, res, next) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    res.status(200).json(booking);
  },

  addNewBooking: async (req, res, next) => {
    const userId = req.body.user;
    const flightId = req.body.flight;
    // console.log(userId, flightId);
    // const newBooking = new Booking({ userId, flightId });
    // const booking = await newBooking.save();
    const flight = await Flight.findById(flightId);
    const user = await User.findById(userId);
    user.flights.push(flight);
    await user.save();
    const newBooking = new Booking({ flight, user });
    const booking = await newBooking.save();
    res.status(201).json({ success: "true" });
  },

  cancelBooking: async (req, res, next) => {
    const userId = req.body.user;
    const flightId = req.body.flight;
    const { bookingId } = req.params;
    console.log(bookingId)
    const result = await Booking.findByIdAndDelete(bookingId);
    const user = await User.findById(userId);
    const flight = await Flight.findById(flightId);
    user.flights.pull(flight);
    await user.save();
    res.status(200).json({ success: "true" });
  },
};
