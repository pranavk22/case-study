const JWT = require("jsonwebtoken");
let User = require("../models/user");

signToken = (user) => {
  return JWT.sign(
    {
      iat: new Date().getTime(),
    },
    process.env.JWT_KEY,
    {
      subject: user.id,
      issuer: "my-server",
      expiresIn: "1h",
    }
  );
};
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });
    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log("Inside signIn method");
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("Inside secret method");
    res.json({ secret: "response" });
  },
};
