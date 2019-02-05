const express = require("express");
const router = express.Router();
const title = "Activity Log";

router.get("/", (req, res) => {
  var src = "./menu/activity_log.html";
  res.render("./index", {
    title: title,
    src: src
  });
});

module.exports = router;
