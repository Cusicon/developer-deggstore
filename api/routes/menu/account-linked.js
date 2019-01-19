const express = require("express");
const router = express();
const title = "Account Linked";

router.get("/", (req, res) => {
  res.send(title);
});


module.exports = router;