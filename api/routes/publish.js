const express = require("express");
const router = express();

/******************** MODELS ********************/
const App = require("../models/application");
const Developer = require("../models/developer");

/********** DRAFT APPS **********/

/** CREATE & SAVE APP */

// Create Draft app
router.post("/draft", (req, res) => {
	// Assigning variables
	var default_language = req.body.default_language;
	var version = "1.0";
	var app_title = req.body.app_title;
	var app_name = app_title.toLowerCase();
	var developer = req.user.id;
	var status = "draft";
	var last_updated = new Date().toString();

	// Validating form
	req.checkBody("default_language", "Select a Default language!").notEmpty();
	req.checkBody("app_title", "Title is required!").notEmpty();

	// Checking for Errors
	var errors = req.validationErrors();
	if (errors) {
		console.log("Error Incoming...");
		console.log("Error: " + errors);
		res.render("./dashboard", { title: title, errors: errors });
	} else {
		var newApp = new App({
			default_language: default_language,
			version: version,
			app_title: app_title,
			app_name: app_name,
			developer: developer,
			status: status,
			last_updated: last_updated
		});
		App.getAppByTitle(app_name, (err, result) => {
			if (err) console.log(err);
			else {
				if (result) {
					var message = `${app_title} already exist!, Try something unique.`;
					req.flash("error", message);
					res.location("/app/dashboard");
					res.redirect("/app/dashboard");
				} else {
					App.createApp(newApp, (err, app) => {
						if (err) console.log(err);
						else {
							var message = `App created!`;
							console.log(message + "\n");
							res.location("/app/publish/" + app._id + "/dashboard");
							res.redirect("/app/publish/" + app._id + "/dashboard");
						}
					});
				}
			}
		});
	}
});

// Split Keywords
function getKeywords(keyword = "") {
	var keywords = keyword.split(",");
	return keywords;
}

// Save Draft
router.post("/:id/save", (req, res) => {
	console.log("Assigning variables\n");
	// Assigning variables
	var appID = req.params.id;
	var default_language = req.body.default_language;
	var version = "1.0";
	var app_title = req.body.app_title;
	var developer = req.user.id;
	var status = "draft";
	var app_short_desc = req.body.app_short_desc;
	var app_long_desc = req.body.app_long_desc;
	var app_keywords = req.body.app_keywords;
	var app_promo_video = req.body.app_promo_video || "undefined";
	var app_type = req.body.app_type;
	var app_category = req.body.app_category;
	var app_price = req.body.app_price;
	var website = req.body.website || "undefined";
	var email = req.body.email;
	var phone = req.body.phone || "undefined";
	var review_first_name = req.body.review_first_name;
	var review_last_name = req.body.review_last_name;
	var review_phone_no = req.body.review_phone_no;
	var review_email = req.body.review_email;
	var privacy = req.body.privacy || "undefined";
	var last_updated = new Date().toString();

	console.log("Saving Draft...\n");
	var newApp = new App({
		default_language: default_language,
		version: version,
		app_title: app_title,
		app_name: app_title.toLowerCase(),
		developer: developer,
		status: status,
		app_short_desc: app_short_desc,
		app_long_desc: app_long_desc,
		app_keywords: getKeywords(app_keywords),
		app_promo_video: app_promo_video,
		app_type: app_type,
		app_category: app_category,
		app_price: app_price,
		website: website,
		email: email,
		phone: phone,
		app_review_info: {
			first_name: review_first_name,
			last_name: review_last_name,
			phone_no: review_phone_no,
			email: review_email
		},
		privacy: privacy,
		last_updated: last_updated
	});
	App.updateApp(appID, newApp, (err, app, result) => {
		if (err) console.log(err);
		else {
			console.log("Draft saved!\n");
			console.log(app);
			var message = `Draft saved!`;
			console.log(message + "\n");
			req.flash("success", message);
			// res.render("./publish", { title, app });
			res.location("/app/publish/draft/" + appID);
			res.redirect("/app/publish/draft/" + appID);
		}
	});
});

// Calculate Rating
router.post("/:id/calculateRating", (req, res) => {
	res.send(title);
});

/******************** EXISTING APPS ROUTES ********************/

router.get("/:id/dashboard", (req, res) => {
	var id = req.params.id;
	App.getAppById(id, (err, app) => {
		if (err) console.log(err);
		else {
			var src = "./publish/dashboard.html";
			res.render("./publish", {
				title: `Dashboard :: ${app.app_title}`,
				src: src,
				app: app
			});
		}
	});
});

// Statistics route
var statisticsRoute = require("./publish/statistics");
router.use("/", statisticsRoute);

// Crashes route
var crashesRoute = require("./publish/crashes");
router.use("/", crashesRoute);

// Services route
var servicesRoute = require("./publish/services");
router.use("/", servicesRoute);

// Package route
var packageRoute = require("./publish/package");
router.use("/", packageRoute);

// Test flight route
var testflightRoute = require("./publish/testflight");
router.use("/", testflightRoute);

// Artifacts Library route
var artifactsRoute = require("./publish/artifacts");
router.use("/", artifactsRoute);

// Pre Launch route
var pre_launchRoute = require("./publish/pre_launch");
router.use("/", pre_launchRoute);

// Storelisting route
var storelistingRoute = require("./publish/storelisting");
router.use("/", storelistingRoute);

// Storelisting Exp route
var storelisting_expRoute = require("./publish/storelisting_exp");
router.use("/", storelisting_expRoute);

// In-app products route
var in_app_productsRoute = require("./publish/in_app_products");
router.use("/", in_app_productsRoute);

// Sales route
var salesRoute = require("./publish/sales");
router.use("/", salesRoute);

// Acquisition route
var acquisitionRoute = require("./publish/acquisition");
router.use("/", acquisitionRoute);

// Adwords Campaigns route
var adwords_campaignsRoute = require("./publish/adwords_campaigns");
router.use("/", adwords_campaignsRoute);

// Promotions route
var promotionsRoute = require("./publish/promotions");
router.use("/", promotionsRoute);

// Optimization Tips route
var optimization_tipsRoute = require("./publish/optimization_tips");
router.use("/", optimization_tipsRoute);

// Total Revenue route
var total_revenueRoute = require("./publish/total_revenue");
router.use("/", total_revenueRoute);

// Ratings route
var ratingsRoute = require("./publish/ratings");
router.use("/", ratingsRoute);

// Reviews Analysis route
var reviews_analysisRoute = require("./publish/reviews_analysis");
router.use("/", reviews_analysisRoute);

// Reviews route
var reviewsRoute = require("./publish/reviews");
router.use("/", reviewsRoute);

// Beta Feedback route
var beta_feedbackRoute = require("./publish/beta_feedback");
router.use("/", beta_feedbackRoute);

module.exports = router;
