const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  methods: {
    type: [String],
    required: true,
  },
  local: {
    email: {
      type: String,
      // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
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
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  userDetails: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserDetail",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    console.log("entered");
    if (!this.methods.includes("local")) {
      next();
    }
    //the user schema is instantiated
    const user = this;
    console.log(user.isModified("local.password"));
    //check if the user has been modified to know if the password has already been hashed
    if (!user.isModified("local.password")) {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    console.log(passwordHash);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    console.log(this.local.password);
    console.log("exited");
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
