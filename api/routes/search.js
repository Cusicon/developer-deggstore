const express = require("express");
const router = express();
const title = "Search Result";

router.get("/", (req, res) => {
    res.render("search_result", { title });
});

module.exports = router;
