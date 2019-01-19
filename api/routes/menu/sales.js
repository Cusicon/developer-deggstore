const express = require("express");
const router = express();
const title = "Sales";

router.get("/", (req, res) => {
    res.send(title);
});

module.exports = router;
