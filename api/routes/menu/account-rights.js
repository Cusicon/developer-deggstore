const express = require("express");
const router = express.Router();
const title = "Account Rights";

router.get("/", (req, res) => {
    var src = "./menu/account_rights.html";
    res.render("./index", {
        title: title,
        src: src
    });
});


module.exports = router;