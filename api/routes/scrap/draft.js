const express = require("express");
const router = express();
const path = require("path");
const multer = require("multer");
const title = "Draft";

/******************** MODELS ********************/
const App = require("../../models/application");

/******************** NEW APP ROUTES ********************/

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
