const express = require("express");
const router = express.Router();
const title = "Account Linked";

router.get("/", (req, res) => {
  var src = "./menu/account_linked.html";
  res.render("./index", {
    title: title,
    src: src
  });
});


module.exports = router;