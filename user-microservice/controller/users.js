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

    let foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    foundUser = await User.findOne({
      $or: [{ "google.email": email }, { "facebook.email": email }],
    });
    if (foundUser) {
      // Let's merge them?
      foundUser.methods.push("local");
      foundUser.local = {
        email: email,
        password: password,
      };
      await foundUser.save();
      // Generate the token
      const token = signToken(foundUser);
      // Respond with token
      return res.status(200).json({ token, foundUser });
    }
    const newUser = new User({
      methods: ["local"],
      local: {
        email: email,
        password: password,
      },
    });
    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({ token, newUser });
  },

  signIn: async (req, res, next) => {
    console.log(req.user);
    const token = signToken(req.user);
    const newUser = req.user;
    res.status(200).json({ token, newUser });
  },
};
