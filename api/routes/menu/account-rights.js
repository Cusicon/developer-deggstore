const express = require("express");
const router = express();
const title = "Account Rights";

router.get("/", (req, res) => {
    res.send(title);
});


module.exports = router;