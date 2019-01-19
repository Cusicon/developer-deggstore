const express = require("express");
const router = express();
const title = "Game Services";

router.get("/", (req, res) => {
    res.send(title);
});

module.exports = router;
