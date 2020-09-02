const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
// const cookieSession = require("cookie-session");
// require("./passport");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key1", "key2"],
//   })
// );

const uri = process.env.ATLAS_URI;
const testUri = process.env.ATLAS_URI_TEST;
if (!process.env.NODE_ENV === "test") {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
} else {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/users");

app.use("/", userRouter);

module.exports = app;
