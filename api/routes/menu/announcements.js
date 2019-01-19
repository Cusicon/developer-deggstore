const express = require("express");
const router = express();
const title = "Announcements";

router.get("/", (req, res) => {
  res.send(title);
});

module.exports = router;
