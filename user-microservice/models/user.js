const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
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
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true,
  },
  flights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
