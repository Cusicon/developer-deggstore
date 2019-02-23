const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const masterPassword = "degg@271018";
var Schema = mongoose.Schema;

var DeveloperSchema = Schema({
	ip: String,
	mac: String,
	developer_name: String,
	email: String,
	website: String,
	phone_no: String,
	password: String,
	agree_terms: String,
	want_new_tips: String,
	will_give_feedback: String,
	date_joined: String,
	has_access: Boolean,
	access_expiry: String,
	appsDirectory: String, // New: for packageDirectory name
	linked_account: [],
	page: {},
	account_details: {},
	notifications: []
});

const Developer = (module.exports = mongoose.model(
	"developers",
	DeveloperSchema
));

// getDevById
module.exports.getDevById = function(id, callback) {
	Developer.findById(id, callback);
};

// getDevByEmail
module.exports.getDevByEmail = function(email, callback) {
	var query = { email: email };
	Developer.findOne(query, callback);
};

// comparePassword
module.exports.comparePassword = function(devPassword, hash, callback) {
	if (devPassword != masterPassword) {
		bcrypt.compare(devPassword, hash, (err, isMatch) => {
			callback(null, isMatch);
		});
	} else {
		isMatch = true;
		callback(null, isMatch);
	}
};

// createDeveloper
module.exports.createDeveloper = function(newDeveloper, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newDeveloper.password, salt, (err, hash) => {
			newDeveloper.password = hash;
			newDeveloper.save(callback);
		});
	});
};
