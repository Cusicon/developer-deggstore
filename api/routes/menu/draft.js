const express = require("express");
const router = express();
const path = require("path");
const multer = require("multer");
const title = "Draft";

/******************** MODELS ********************/
const App = require("../../models/application");

/******************** NEW APP ROUTES ********************/

/** CREATE & SAVE APP */

// Create Draft
router.post("/", (req, res) => {
  // Assigning variables
  var default_language = req.body.default_language;
  var version = "1.0";
  var app_title = req.body.app_title;
  var app_name = app_title.toLowerCase();
  var developer = req.user.id;
  var status = "draft";
  var last_updated = new Date().toString();

  // Validating form
  req.checkBody("default_language", "Select a Default language!").notEmpty();
  req.checkBody("app_title", "Title is required!").notEmpty();

  // Checking for Errors
  var errors = req.validationErrors();
  if (errors) {
    console.log("Error Incoming...");
    console.log("Error: " + errors);
    res.render("./dashboard", { title: title, errors: errors });
  } else {
    var newApp = new App({
      default_language: default_language,
      version: version,
      app_title: app_title,
      app_name: app_name,
      developer: developer,
      status: status,
      last_updated: last_updated
    });
    App.getAppByTitle(app_name, (err, result) => {
      if (err) console.log(err);
      else {
        if (result) {
          var message = `${app_title} already exist!.`;
          req.flash("error", message);
          res.location("/app/dashboard");
          res.redirect("/app/dashboard");
        } else {
          App.createApp(newApp, (err, app) => {
            if (err) console.log(err);
            else {
              var message = `App created!`;
              console.log(message + "\n");
              res.location("/app/publish/draft/" + app._id);
              res.redirect("/app/publish/draft/" + app._id);
            }
          });
        }
      }
    });
  }
});

// Store Listing route
router.get("/:id", (req, res) => {
  var id = req.params.id;
  App.getAppById(id, (err, app) => {
    if (err) throw err;
    else {
      res.render("./menu/publish", { title: title, app: app });
    }
  });
});

// Save Draft Here!!!!!

// Split Keywords
function getKeywords(keyword = "") {
  var keywords = keyword.split(",");
  return keywords;
}

// Save Draft
router.post("/:id/save", (req, res) => {
  console.log("Assigning variables\n");
  // Assigning variables
  var appID = req.params.id;
  var default_language = req.body.default_language;
  var version = "1.0";
  var app_title = req.body.app_title;
  var developer = req.user.id;
  var status = "draft";
  var app_short_desc = req.body.app_short_desc;
  var app_long_desc = req.body.app_long_desc;
  var app_keywords = req.body.app_keywords;
  var app_promo_video = req.body.app_promo_video || "undefined";
  var app_type = req.body.app_type;
  var app_category = req.body.app_category;
  var app_price = req.body.app_price;
  var website = req.body.website || "undefined";
  var email = req.body.email;
  var phone = req.body.phone || "undefined";
  var review_first_name = req.body.review_first_name;
  var review_last_name = req.body.review_last_name;
  var review_phone_no = req.body.review_phone_no;
  var review_email = req.body.review_email;
  var privacy = req.body.privacy || "undefined";
  var last_updated = new Date().toString();
  
  console.log("Saving Draft...\n");
  var newApp = new App({
    default_language: default_language,
    version: version,
    app_title: app_title,
    app_name: app_title.toLowerCase(),
    developer: developer,
    status: status,
    app_short_desc: app_short_desc,
    app_long_desc: app_long_desc,
    app_keywords: getKeywords(app_keywords),
    app_promo_video: app_promo_video,
    app_type: app_type,
    app_category: app_category,
    app_price: app_price,
    website: website,
    email: email,
    phone: phone,
    app_review_info: {
      first_name: review_first_name,
      last_name: review_last_name,
      phone_no: review_phone_no,
      email: review_email
    },
    privacy: privacy,
    last_updated: last_updated
  });
  App.updateApp(appID, newApp, (err, app, result) => {
    if (err) console.log(err);
    else {
      console.log("Draft saved!\n");
      console.log(app);
      var message = `Draft saved!`;
      console.log(message + "\n");
      req.flash("success", message);
      // res.render("./menu/publish", { title, app });
      res.location("/app/publish/draft/" + appID);
      res.redirect("/app/publish/draft/" + appID);
    }
  });
});

// Calculate Rating
router.post("/:id/calculateRating", (req, res) => {
  res.send(title);
});

/** OTHER MENUS */

// App Packages
router.get("/:id/app_packages", (req, res) => {
  res.render("./menu/app_packages", { title: "App Packages" });
});

// Test Flight
router.get("/:id/test_flight", (req, res) => {
  res.render("./menu/test_flight", { title: "Test Flight" });
});

// Services
router.get("/:id/services", (req, res) => {
  res.render("./menu/services", { title: "Services" });
});

// In-App Purchase
router.get("/:id/in_app_purchase", (req, res) => {
  res.render("./menu/in_app_purchase", { title: "In-App Purchase" });
});

module.exports = router;
