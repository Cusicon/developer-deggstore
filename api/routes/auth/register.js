const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const router = express();
const address = require("address");
const path = require("path");
const title = "Create Account";

/******************** MODELS ********************/
const Developer = require("../../models/developer");

router.get("/", (req, res) => {
	if (!req.user) {
		console.log("\nRouting register UI...");
		res.render("./auth/register", { title: title });
	} else {
		res.redirect("/app/dashboard");
	}
});

function createPackagesDirectory(userEmail) {
	bcrypt.genSalt(5, (err, salt) => { // generate salt
		bcrypt.hash(userEmail, salt, (err, hash) => {
			userEmail = hash;
			fs.mkdir(path.join(__dirname, `../../../public/store/${userEmail}`), err => { // Make directory
				if(err) console.log(err);
				else{
					console.log("Packages directory created!!!");
				}
			}); 
		});
	});
}

router.post("/", (req, res) => {
	if (!req.user) {
		console.log("Creating account...");

		// Assigning variable to form inputs
		var mac = address.mac((err, addr) => {
			return addr;
		});
		var ip = address.ip();
		var developer_name = req.body.developer_name;
		var email = req.body.email;
		var website = req.body.website;
		var phone_no = req.body.phone_no;
		var password = req.body.password;
		var agree_terms = req.body.agree_terms;
		var want_new_tips = req.body.want_new_tips;
		var will_give_feedback = req.body.will_give_feedback;

		// Form validation
		req.checkBody("developer_name", "Developer name is required!.").notEmpty();
		req.checkBody("email", "Email is required!.").isEmail();
		req
			.checkBody("con_email", "Emails don't match!.")
			.isEmail()
			.equals(email);
		req
			.checkBody("phone_no", "Phone number is required and must be a number!.")
			.isNumeric()
			.notEmpty();
		req.checkBody("password", "Password is required!.").notEmpty();
		req.checkBody("con_password", "Passwords don't match!.").equals(password);
		req
			.checkBody(
				"agree_terms",
				"Please agree to the Degg Store Developer Station distribution agreement to continue!."
			)
			.notEmpty();

		// Generate Access Expiry_date
		function generate_access_expiry() {
			// Present Dates
			var presentYear = new Date().getFullYear();
			var presentMonth = new Date().getMonth();
			var presentDate = new Date().getDate();

			// Expiry Dates
			var expiryYear = ++presentYear;
			var expiryMonth = presentMonth;
			var expiryDate = --presentDate;

			var result = new Date(expiryYear, expiryMonth, expiryDate).toString();
			return result;
		}

		// Check for Validation Errors
		var errors = req.validationErrors();

		if (errors) {
			console.log(`Errors Incoming...`);
			console.log(`Errors: ${errors}`);
			res.render("./auth/register", { title: title, errors: errors });
		} else {
			var newDeveloper = new Developer({
				ip: ip,
				mac: mac,
				developer_name: developer_name,
				email: email.toLowerCase(),
				website: website,
				phone_no: phone_no,
				password: password,
				agree_terms: agree_terms,
				want_new_tips: want_new_tips,
				will_give_feedback: will_give_feedback,
				date_joined: new Date().toString(),
				has_access: true,
				access_expiry: generate_access_expiry()
			});

			Developer.getDevByEmail(email, (err, developer) => {
				if (err) {
					console.log(err);
				} else {
					if (developer) {
						var message = `Email already exist!, Try another.`;
						req.flash("error", message);
						res.location("/register");
						res.redirect("/register");
					} else {
						Developer.createDeveloper(newDeveloper, (err, developer) => {
							if (err) {
								console.log(`Error: ${err}`);
							} else {
								var message = `Account created!`;
								console.log(message);
								createPackagesDirectory(email); // Create packages directory
								req.flash("success", message);
								res.location("/lock");
								res.redirect("/lock");
							}
						});
					}
				}
			});
		}
	} else {
		res.redirect("/app/dashboard");
	}
});

module.exports = router;
