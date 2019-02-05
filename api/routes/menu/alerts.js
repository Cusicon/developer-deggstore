const express = require("express");
const router = express.Router();
const title = "Alerts";

router.get("/", (req, res) => {
  var src = "./menu/alerts.html";
  res.render("./index", {
    title: title,
    src: src
  });
});

module.exports = router;
