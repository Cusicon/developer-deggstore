const express = require("express");
const router = express.Router();
const title = "Game Services";

/******************** MODELS ********************/
const App = require("../../models/application");

router.get("/", (req, res) => {
	var src = "./menu/game-services.html";
	res.render("./index", {
		title: title,
		src: src
	});
});

module.exports = router;
