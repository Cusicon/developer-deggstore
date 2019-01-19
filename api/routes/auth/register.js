const express = require("express");
const router = express();
const address = require("address");
const path = require("path");
const title = "Register";

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

router.post("/", (req, res) => {
  if (!req.user) {
    console.log("Creating account...");

    // Assigning variable to form inputs
    var mac = address.mac((err, addr) => {
      return addr;
    });
    var ip = address.ip();
    var full_name = req.body.full_name;
    var email = req.body.email;
    var password = req.body.password;
    var company_name = req.body.company_name;
    var agree_terms = req.body.agree_terms;

    // Form validation
    req.checkBody("full_name", "Full name is required!.").notEmpty();
    req
      .checkBody("email", "Email is required!.")
      .isEmail()
      .notEmpty();
    req.checkBody("password", "Password is required!.").notEmpty();
    req
      .checkBody("con_password", "Passwords don't match!.")
      .equals(req.body.password)
      .notEmpty();
    req.checkBody("company_name", "Company's name is required!.").notEmpty();

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

      var result = new Date(expiryYear, expiryMonth, expiryDate).toDateString();
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
        full_name: full_name,
        email: email.toLowerCase(),
        password: password,
        company_name: company_name,
        has_access: true,
        access_expiry: generate_access_expiry(),
        date_created: new Date().toDateString(),
        agree_terms: agree_terms,
        linked_account: [],
        page: {},
        account_details: {},
        notifications: {}
      });

      Developer.createDeveloper(newDeveloper, (err, developer) => {
        if (err) {
          console.log(`Error ${err}`);
        } else {
          var message = `Account created!`;
          console.log(message);
          req.flash("success", message);
          res.location("/lock");
          res.redirect("/lock");
        }
      });
    }
  } else {
    res.redirect("/app/dashboard");
  }
});

module.exports = router;
