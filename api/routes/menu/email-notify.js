const express = require("express");
const router = express.Router();
const title = "Email Notification";

router.get("/", (req, res) => {
	var src = "./menu/email_notify.html";
	res.render("./index", {
		title: title,
		src: src
	});
});

module.exports = router;
