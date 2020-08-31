let Booking = require("../models/booking");
let User = require("../models/userDetails");
let Flight = require("../models/flight");

const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
var customId = require("custom-id");
require("dotenv").config();

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

module.exports = {
  getAllBookings: async (req, res, next) => {
    const bookings = await Booking.find().populate("flight").populate("user");
    res.status(200).json(bookings);
  },

  getBookingById: async (req, res, next) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    res.status(200).json(booking);
  },

  addNewBooking: async (req, res, next) => {
    const userId = req.body.user;
    const flightId = req.body.flight;
    console.log(userId, flightId);
    // const newBooking = new Booking({ userId, flightId });
    // const booking = await newBooking.save();
    const flight = await Flight.findById(flightId);
    const user = await User.findById(userId);
    let bookingId = customId({
      name: flight.from + flight.to + flight.airlines,
      email: user.firstName + user.lastName,
    });
    console.log(bookingId);
    user.flights.push(flight);
    await user.save();

    const newBooking = new Booking({ bookingId, flight, user });
    const booking = await newBooking.save();
    console.log(booking);
    res.status(201).json(booking);
  },

  cancelBooking: async (req, res, next) => {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    const userId = booking.user;
    const flightId = booking.flight;
    console.log(bookingId, userId, flightId);
    const result = await Booking.findByIdAndDelete(bookingId);
    const user = await User.findById(userId);
    const flight = await Flight.findById(flightId);
    user.flights.pull(flight);
    await user.save();
    res.status(200).json({ success: "true" });
  },

  getUserDetailBookings: async (req, res, next) => {
    const { userDetailId } = req.params;
    const bookings = await Booking.find({ user: userDetailId })
      .populate("flight")
      .populate("user");
    res.status(200).json(bookings);
  },

  payment: async (req, res, next) => {
    console.log(req.body.fare);
    const payment_capture = 1;
    const amount = req.body.fare * 100;
    console.log(amount);
    const currency = "INR";
    const receipt = shortid.generate();
    try {
      const response = await instance.orders.create({
        amount,
        currency,
        receipt,
        payment_capture,
      });
      console.log(response);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  },

  verifyPayment: (req, res) => {
    // do a validation
    const secret = process.env.SECRET;

    console.log(req.body);

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      // process it
    } else {
      // pass it
    }
    res.json({ status: "ok" });
  },
};
