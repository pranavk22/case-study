const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  local: {
    email: {
      type: String,
      // required: true,
      // unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: true,
    },
  },
  google: {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  // userType: {
  //   type: String,
  //   enum: ["admin", "user"],
  //   default: "user",
  // },
  // userDetails: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "UserDetail",
  //   },
  // ],
});

userSchema.pre("save", async function (next) {
  try {
    if (this.method !== "local") {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", userSchema);
