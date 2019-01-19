const express = require("express");
const router = express();
const title = "Activity Log";

router.get("/", (req, res) => {
  res.send(title);
});

module.exports = router;
