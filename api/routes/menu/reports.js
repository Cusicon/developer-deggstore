const express = require("express");
const router = express.Router();
const title = "Reports";

router.get("/", (req, res) => {
	var src = "./menu/reports.html";
	res.render("./index", {
		title: title,
		src: src
	});
});

module.exports = router;
