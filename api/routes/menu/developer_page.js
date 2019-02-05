const express = require("express");
const router = express.Router();
const title = "Developer Page";

router.get("/", (req, res) => {
	var src = "./menu/developer_page.html";
	res.render("./index", {
		title: title,
		src: src
	});
});

module.exports = router;
