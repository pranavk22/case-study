const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var flightSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Flight", flightSchema);
