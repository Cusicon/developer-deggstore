/******************** REQUIRE MODULES ********************/
const createError = require("http-errors");
const logger = require("morgan");
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const LocalStrategy = require("passport-local").Strategy;
const port = process.env.PORT || 3000;

/********** GLOBAL VARIABLES ****************/
global.Log;
global.User = express().request.user;

/********** GLOBAL VARIABLES ****************/

/********** DB CONNECTION ****************/
require("./api/db/db_conn");

/******************** VIEW ENGINE ********************/
app.set("views", path.join(__dirname, "/views/"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/******************** MIDDLEWARES ********************/
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "/public/"))); // set public folder
app.use(bodyParser()); // use bodyParser
app.use(cookieParser()); // use cookieParser
app.use(expressLayouts); // use expressLayouts
app.use(express.json()); // use express.json
app.use(express.urlencoded({ extended: false })); // use express.urlencoded

// Express-session Middleware
app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true
	})
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express-validator middleware
app.use(
	expressValidator({
		errorFormater: (param, msg, value) => {
			var namespace = param.split("."),
				root = namespace.shift(),
				formParam = root;

			while (namespace.length) {
				formParam += "[" + namespace.shift() + "]";
			}
			return {
				param: formParam,
				msg: msg,
				value: value
			};
		}
	})
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use((req, res, next) => {
	res.locals.messages = require("express-messages")(req, res);
	next();
});

// Writing to file "server.log"
Log = (log) => {
	fs.appendFile("./api/log/server.log", log + "\n", err => {
		if (err) {
			console.log("Unable to write to server.log\n");
		} else {
			// console.log(log)
		}
	});
};

// Custom middleware for log request
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	Log(log);
	next();
});

// Get any Route and send Global variables
app.get("*", (req, res, next) => {
	User = req.user;
	res.locals.user = req.user || null;
	res.locals.url = req.originalUrl || null;
	next();
});

// Get any app "GET" Route and check if user is signed in
// else redirect to sign out!
app.get("/app/*", (req, res, next) => {
	if (!req.user) {
		// Sign Out
		res.redirect("/lock/out");
	} else {
		Log(`${User.developer_name || "none"} is active!`);
	}
	next();
});

// Get any app "POST" Route and check if user is signed in
// else redirect to sign out!
app.post("/app/*", (req, res, next) => {
	if (!req.user) {
		// Sign Out
		res.redirect("/lock/out");
	} else {
		Log(`${User.developer_name || "none"} is active!`);
	}
	next();
});

/******************** AUTH ROUTES ********************/

// Register route
var RegisterRoute = require("./api/routes/auth/register");
app.use("/register", RegisterRoute);

// Lock route
var lockRoute = require("./api/routes/auth/lock");
app.use("/lock", lockRoute);

/******************** GENERAL ROUTES ********************/

// Index route
var indexRoute = require("./api/routes/index");
app.use("/", indexRoute);

// Publish route
var publishRoute = require("./api/routes/publish");
app.use("/app/publish", publishRoute);

// Search route
var SearchRoute = require("./api/routes/search");
app.use("/app/search", SearchRoute);

/******************** ERROR HANDLERS ********************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err);
	// res.render("./maintenance/404", { title: "Oops! You're Lost." });
});

/******************** SERVER LISTENING ********************/
app.listen(port, err => {
	if (err) throw Error;
	else console.log("Server listening at port: " + port);
});
