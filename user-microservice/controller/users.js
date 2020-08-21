let User = require("../models/user");
// let Flight = require("../models/flight");

module.exports = {
  getAllUsers: async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
  },

  addNewUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json({ success: "true" });
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  deleteUser: async (req, res, next) => {
    const { userId } = req.params;
    const result = await User.findByIdAndDelete(userId);
    res.status(200).json({ success: "true" });
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findByIdAndUpdate(userId, newUser);
    console.log("result", result);
    res.status(200).json({ success: "true" });
  },

  getUserFlights: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user.flights);
  },

//   addUserFlight: async (req, res, next) => {
//     const { userId } = req.params;
//     const newFlight = new Flight(req.body);
//     const user = await User.findById(userId);
//     await newFlight.save();
//     user.flights.push(newFlight);
//     await user.save();
//     res.status(201).json(newFlight);
//   },

//   addUserFlightById: async (req, res, next) => {
//     const { userId, flightId } = req.params;
//     const newFlight = await Flight.findById(flightId);
//     const user = await User.findById(userId);
//     user.flights.push(newFlight);
//     await user.save();
//     res.status(201).json(newFlight);
//   },

//   cancelUserFlightById: async (req, res, next) => {
//     const { userId, flightId } = req.params;
//     const user = await User.findById(userId);
//     const flight = await Flight.findById(flightId);
//     user.flights.pull(flight);
//     await user.save();
//     res.status(200).json({ success: "true" });
//   },
};
