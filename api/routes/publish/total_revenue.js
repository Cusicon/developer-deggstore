const express = require("express");
const router = express();
const title = "Total Revenue";

/******************** MODELS ********************/
const App = require("../../models/application");

router.get("/:id/total_revenue", (req, res) => {
	var id = req.params.id;
	App.getAppById(id, (err, app) => {
		if (err) console.log(err);
		else {
			var src = "./publish/total_revenue.html";
			res.render("./publish", {
				title: `${title} :: ${app.app_title}`,
				src: src,
				app: app
			});
		}
	});
});

module.exports = router;
