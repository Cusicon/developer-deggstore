const express = require("express");
const router = express();
const title = "Email Notification";

router.get("/", (req, res) => {
    res.send(title);
});

module.exports = router;
