const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppSchema = Schema({
	default_language: String,
	version: String,
	app_title: String,
	app_name: String,
	developer: Schema.Types.ObjectId,
	status: String,
	app_short_desc: String,
	app_long_desc: String,
	app_keywords: [String],
	app_snapshots: [
		{
			title: String,
			path: String
		}
	],
	app_icon: {
		title: String,
		path: String
	},
	app_promo_video: String,
	app_type: String,
	app_category: String,
	app_price: String,
	website: String,
	email: String,
	phone: String,
	app_review_info: {
		first_name: String,
		last_name: String,
		phone_no: String,
		email: String
	},
	privacy: String,
	last_updated: String,
	app_content_rating: {
		rated_date: String,
		rated_value: String
	},
	app_packages: [
		{
			version: String,
			path: String,
			date_uploaded: String
		}
	],
	reviews: {},
	statistics: {}
});

const App = (module.exports = mongoose.model("apps", AppSchema));

// createApp
module.exports.createApp = function(newApp, callback) {
	newApp.save(callback);
};

module.exports.updateApp = function(id, newApp, callback) {
	var query = { _id: id };
	App.findOneAndUpdate(query, newApp, callback);
};

// getAppById
module.exports.getAppById = function(id, callback) {
	App.findById(id, callback);
};

// getAppByDeveloperID
module.exports.getAppByDeveloperID = function(devID, callback) {
	var query = { developer: devID };
	App.findOne(query, callback);
};

// getAppById
module.exports.getAppByTitle = function(app_name, callback) {
	var query = { app_name: app_name };
	App.findOne(query, callback);
};
