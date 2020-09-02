const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-token").Strategy;
const FacebookStrategy = require("passport-facebook-token");
const { ExtractJwt } = require("passport-jwt");
const User = require("./models/user");

require("dotenv").config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: process.env.JWT_KEY,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ "local.email": email });

        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "googleToken",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      try {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        let existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("User already exists");
          return done(null, existingUser);
        }
        console.log("User did not exist. New user created");

        // Check if we have someone with the same email
        existingUser = await User.findOne({
          $or: [
            { "local.email": profile.emails[0].value },
            { "facebook.email": profile.emails[0].value },
          ],
        });
        if (existingUser) {
          // We want to merge google's data with local auth
          existingUser.methods.push("google");
          existingUser.google = {
            id: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          };
          await existingUser.save();
          console.log("Merged account with existing");
          return done(null, existingUser);
        }
        const newUser = new User({
          methods: ["google"],
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
      // });
    }
  )
);

passport.use(
  "facebookToken",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      // profileFields: ["id", "email", "name", "displayName"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //   return cb(err, user);
      try {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        let existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          console.log("User already exists");
          return done(null, existingUser);
        }
        console.log("User did not exist. New user created");

        existingUser = await User.findOne({
          $or: [
            { "local.email": profile.emails[0].value },
            { "google.email": profile.emails[0].value },
          ],
        });
        if (existingUser) {
          // We want to merge facebook's data with local auth
          existingUser.methods.push("facebook");
          existingUser.facebook = {
            id: profile.id,
            email: profile.emails[0].value,
          };
          await existingUser.save();
          console.log("Merged account with existing");
          return done(null, existingUser);
        }

        const newUser = new User({
          methods: ["facebook"],
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
