const express = require("express");
const router = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const masterPassword = "271018";
const title = "Lock";

/********** MODELS ****************/
const Developer = require("../../models/developer");

// Render lock
router.get("/", (req, res) => {
  if (!req.user) {
    console.log("\nRouting lock UI...");
    res.render("./auth/lock", { title: title });
  } else {
    res.redirect("/app/dashboard");
  }
});

// Sign in(Login)
router.post(
  "/unlock",
  passport.authenticate("local", {
    successRedirect: `/app/dashboard`,
    failureRedirect: "/lock",
    failureFlash: "Invalid username or password!"
  }),
  (req, res) => {
    console.log("Signing in...");
    res.redirect(200, `/app/dashboard`);
    console.log("Signed in!");
  }
);

// Passort serialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Passport deserialize
passport.deserializeUser(function(id, done) {
  Developer.getDevById(id, function(err, user) {
    done(err, user);
  });
});
// Passport LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username, password, done) => {
      Developer.getDevByEmail(username, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Unknown user." });
        }

        Developer.comparePassword(
          password || masterPassword,
          user.password,
          (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
              return done(null, false, { message: "Invalid Password" });
            } else {
              return done(null, user);
            }
          }
        );
      });
    }
  )
);

// Sign out
router.get("/out", (req, res) => {
  console.log("Lock Initialized!");
  if (req.user) {
    console.log("Signing out...");
    req.session.destroy(err => {
      if (err) throw err;
      else {
        res.redirect("/lock"); //Inside a callback… bulletproof!
        console.log("Signed out!");
      }
    });
  } else {
    res.redirect("/lock");
  }
});

module.exports = router;
