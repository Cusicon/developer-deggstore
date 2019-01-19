const express = require("express");
const router = express();
const title = "Developer Page";

router.get("/", (req, res) => {
  res.send(title);
});

module.exports = router;
