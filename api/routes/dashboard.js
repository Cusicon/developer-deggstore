const express = require("express");
const router = express.Router();
const title = "All Applications";

/******************** MODELS ********************/
const App = require("../models/application");

/* GET home page. */
router.get("/dashboard", function(req, res, next) {
  console.log("Routing Dashboard!!\n");
  if (req.user) {
    var query = { developer: req.user._id };
    App.find(query, (err, apps) => {
      if (err) console.log(err);
      else {
        res.render("dashboard", { title: title, apps: apps });
      }
    });
  } else {
    res.redirect("/lock");
  }
});

module.exports = router;
