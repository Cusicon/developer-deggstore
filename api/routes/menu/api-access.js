const express = require("express");
const router = express.Router();
const title = "Api Access";

router.get("/", (req, res) => {
	var src = "./menu/api_access.html";
	res.render("./index", {
		title: title,
		src: src
	});
});

module.exports = router;
