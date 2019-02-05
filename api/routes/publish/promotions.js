const express = require("express");
const router = express();
const title = "Promotions";

/******************** MODELS ********************/
const App = require("../../models/application");

router.get("/:id/promotions", (req, res) => {
	var id = req.params.id;
	App.getAppById(id, (err, app) => {
		if (err) console.log(err);
		else {
			var src = "./publish/promotions.html";
			res.render("./publish", {
				title: `${title} :: ${app.app_title}`,
				src: src,
				app: app
			});
		}
	});
});

module.exports = router;
