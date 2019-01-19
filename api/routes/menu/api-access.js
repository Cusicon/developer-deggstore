const express = require("express");
const router = express();
const title = "Api Access";

router.get("/", (req, res) => {
    res.send(title);
});

module.exports = router;
