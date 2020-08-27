const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },

  flights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
});

module.exports = mongoose.model("UserDetail", userDetailsSchema);
