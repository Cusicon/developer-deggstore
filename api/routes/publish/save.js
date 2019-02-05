const express = require("express");
const router = express();
const path = require("path");
const multer = require("multer");
const title = "Draft";

/******************** MODELS ********************/
const App = require("../../models/application");

/*********** MULTER ENGINE **********/

//#region

// Disk Storage for Snapshots
const snapshotsStorage = multer.diskStorage({
  destination: "./api/store/src/images/snapshots",
  filename: (req, file, cb) => {
    cb(
      null,
      `${
        req.body.app_name
      }-${file.fieldname.toLowerCase()}-${Date.now()}${path
        .extname(file.originalname)
        .toLowerCase()}`
    );
  }
});

// Init uploads for Snapshots
const snapshotsUpload = multer({
  storage: snapshotsStorage,
  limits: { fileSize: 5000000 }, // Max: 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

snapshotsUpload.single("app_snapshot1");
snapshotsUpload.single("app_snapshot2");
snapshotsUpload.single("app_snapshot3");
snapshotsUpload.single("app_snapshot4");

//#endregion

//#region

// Disk Storage for HI-res icon
const iconStorage = multer.diskStorage({
  destination: "./api/store/src/images/icons",
  filename: (req, file, cb) => {
    cb(
      null,
      `${
        req.body.app_name
      }-${file.fieldname.toLowerCase()}-${Date.now()}${path
        .extname(file.originalname)
        .toLowerCase()}`
    );
  }
});

// Init upload for HI-res icon
const iconUpload = multer({
  storage: iconStorage,
  limits: { fileSize: 5000000 }, // Max: 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

//#endregion

// Check if file it's an Image
function checkFileType(file, cb) {
  // Allowed extension
  var fileTypes = /jpeg|jpg|png/;

  // check extension
  var extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // check mime
  var mimeTypes = fileTypes.test(file.mimetype);

  // check if all is true
  if (extname && mimeTypes) {
    return cb(null, true);
  } else {
    cb(`Error: Please only ".PNG", ".JPG" and ".JPEG" files are allowed!`);
  }
}

// Split Keywords
function getKeywords(keyword = "") {
  var keywords = keyword.split(",");
  return keywords;
}

// Save Draft
router.post("/:id/save", (req, res) => {
  // Assigning variables
  var app_id = req.params.id;
  var default_language = req.body.default_language;
  var version = "1.0";
  var app_title = req.body.app_title;
  var app_name = app_title.toLowerCase();
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

  // Validating for Errors
  req.checkBody("default_language", "Default language is required!.");
  req.checkBody("app_title", "App title is required!.");
  req.checkBody("app_short_desc", "Short description is required!.").notEmpty();
  req.checkBody("app_long_desc", "Long description is required!.").notEmpty();
  req.checkBody("app_keywords", "Keywords are required!.").notEmpty();
  req.checkBody("app_type", "App type is required!.").notEmpty();
  req.checkBody("app_category", "App category is required!.").notEmpty();
  req.checkBody("app_price", "App price is required!.").notEmpty();
  req
    .checkBody("email", "Email is required!.")
    .notEmpty()
    .isEmail();
  req.checkBody("review_first_name", "First name is required!.").notEmpty();
  req.checkBody("review_last_name", "Last name is required!.").notEmpty();
  req.checkBody("review_phone_no", "Phone number is required!.").notEmpty();
  req
    .checkBody("review_email", "Email is required!.")
    .notEmpty()
    .isEmail();

  // Checking for Errors
  var errors = req.validationErrors();
  if (errors) {
    console.log("Error Incoming...");
    console.log("Error: " + errors);
    res.render("./menu/publish", { title: title, errors: errors });
  } else {
    var newApp = new App({
      default_language: default_language,
      version: version,
      app_title: app_title,
      app_name: app_name,
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
    App.createApp(newApp, (err, app) => {
      if (err) console.log(err);
      else {
        console.log(app);
        var message = `Draft saved!`;
        console.log(message + "\n");
        req.flash("success", message);
        res.location("/app/publish/draft/" + app_id);
        res.redirect("/app/publish/draft/" + app_id);
      }
    });
  }
});

// Snappshots route
router.post("/uploadSnappshots", (req, res) => {});

// HI-res Icon route
router.post("/uploadIcon", (req, res) => {});

module.exports = router;
