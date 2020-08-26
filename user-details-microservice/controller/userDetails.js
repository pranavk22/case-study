let UserDetail = require("../models/userDetails");
let User = require("../models/user");

module.exports = {
  getAllUserDetails: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("userDetails");
    res.status(200).json(user.userDetails);
  },

  addNewUserDetail: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const newUserDetail = new UserDetail(req.body);
    const userDetail = await newUserDetail.save();
    user.userDetails.push(userDetail);
    await user.save();
    res.status(201).json({ success: "true" });
  },

  getUserDetail: async (req, res, next) => {
    const { userDetailId } = req.params;
    const user = await UserDetail.findById(userDetailId);
    res.status(200).json(user);
  },

  deleteUserDetail: async (req, res, next) => {
    const { userDetailId } = req.params;
    const result = await UserDetail.findByIdAndDelete(userDetailId);
    res.status(200).json({ success: "true" });
  },

  replaceUserDetail: async (req, res, next) => {
    const { userDetailId } = req.params;
    const newUserDetail = req.body;
    const result = await UserDetail.findByIdAndUpdate(
      userDetailId,
      newUserDetail
    );
    console.log("result", result);
    res.status(200).json({ success: "true" });
  },

  // getUserDetailFlights: async (req, res, next) => {
  //   const { userDetailId } = req.params;
  //   const userDetails = await UserDetail.findById(userDetailId).populate(
  //     "flights"
  //   );
  //   res.status(200).json(userDetails.flights);
  // },

  //   addUserDetailFlight: async (req, res, next) => {
  //     const { userDetailId } = req.params;
  //     const newFlight = new Flight(req.body);
  //     const user = await UserDetail.findById(userDetailId);
  //     await newFlight.save();
  //     user.flights.push(newFlight);
  //     await user.save();
  //     res.status(201).json(newFlight);
  //   },

  //   addUserDetailFlightById: async (req, res, next) => {
  //     const { userDetailId, flightId } = req.params;
  //     const newFlight = await Flight.findById(flightId);
  //     const user = await UserDetail.findById(userDetailId);
  //     user.flights.push(newFlight);
  //     await user.save();
  //     res.status(201).json(newFlight);
  //   },

  //   cancelUserDetailFlightById: async (req, res, next) => {
  //     const { userDetailId, flightId } = req.params;
  //     const user = await UserDetail.findById(userDetailId);
  //     const flight = await Flight.findById(flightId);
  //     user.flights.pull(flight);
  //     await user.save();
  //     res.status(200).json({ success: "true" });
  //   },
};
