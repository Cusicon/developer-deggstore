const express = require("express");
const router = express();
const title = "Account Details";

router.get("/", (req, res) => {
    res.send(title);
});

module.exports = router;