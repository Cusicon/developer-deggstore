const express = require("express");
const router = express.Router();
const title = "Account Details";

router.get("/", (req, res) => {
	var src = "./menu/account_details.html";
	res.render("./index", {
		title: title,
		src: src
	});
});

module.exports = router;
