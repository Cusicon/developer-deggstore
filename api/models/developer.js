const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var DeveloperSchema = Schema({
  ip: String,

  mac: String,

  full_name: String,

  email: String,

  password: String,

  company_name: String,

  has_access: Boolean,

  access_expiry: String,

  date_created: String,

  agree_terms: String,

  linked_account: [],

  page: {},

  account_details: {},

  notifications: {}
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
  bcrypt.compare(devPassword, hash, (err, isMatch) => {
    callback(null, isMatch);
  });
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
