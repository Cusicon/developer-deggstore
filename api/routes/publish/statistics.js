const express = require("express");
const router = express();
const title = "Statistics";

/******************** MODELS ********************/
const App = require("../../models/application");

router.get("/:id/statistics", (req, res) => {
	var id = req.params.id;
	App.getAppById(id, (err, app) => {
		if (err) console.log(err);
		else {
			var src = "./publish/statistics.html";
			res.render("./publish", {
				title: `${title} :: ${app.app_title}`,
				src: src,
				app: app
			});
		}
	});
});

module.exports = router;
