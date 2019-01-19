const express = require("express");
const router = express();
const title = "Statistics";

router.get("/", (req, res) => {
    res.send(title);
});

module.exports = router;
