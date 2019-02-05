const express = require("express");
const router = express();
const title = "Adwords Campaigns";

/******************** MODELS ********************/
const App = require("../../models/application");

router.get("/:id/adwords_campaigns", (req, res) => {
	var id = req.params.id;
	App.getAppById(id, (err, app) => {
		if (err) console.log(err);
		else {
			var src = "./publish/adwords_campaigns.html";
			res.render("./publish", {
				title: `${title} :: ${app.app_title}`,
				src: src,
				app: app
			});
		}
	});
});

module.exports = router;
