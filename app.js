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
function Log(log) {
  fs.appendFile("./api/log/server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to write to server.log\n");
    } else {
      console.log(log);
    }
  });
}

// Custom middleware for log request
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  Log(log);
  next();
});

// Get any Route and send Global variables
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.url = req.originalUrl || null;
  next();
});

// Get any Route and send Global variables
app.get("/app/*", (req, res, next) => {
  if(!req.user){
    // Sign Out
    res.redirect("/lock/out");
  }
  next();
});

// Get any "Post" Route and send Global variables
app.post("/app/*", (req, res, next) => {
  if (!req.user) {
    // Sign Out
    res.redirect("/lock/out");
  }
  next();
});


/******************** GENERAL ROUTES ********************/

// Dashboard route
var dashboardRoute = require("./api/routes/dashboard");
app.use("/app", dashboardRoute);

// Search route
var SearchRoute = require("./api/routes/search");
app.use("/app/search", SearchRoute);


/******************** AUTH ROUTES ********************/

// Register route
var RegisterRoute = require("./api/routes/auth/register");
app.use("/register", RegisterRoute);

// Lock route
var lockRoute = require("./api/routes/auth/lock");
app.use("/lock", lockRoute);

/******************** MENU ROUTES ********************/

// Publish route
var publishRoute = require("./api/routes/menu/publish");
app.use("/app/publish", publishRoute);

// Game-services route
var gameServicesRoute = require("./api/routes/menu/game-services");
app.use("/app/game-services", gameServicesRoute);

// Sales route
var salesRoute = require("./api/routes/menu/sales");
app.use("/app/sales", salesRoute);

// Reviews route
var reviewsRoute = require("./api/routes/menu/reviews");
app.use("/app/reviews", reviewsRoute);

// Statistics route
var statisticsRoute = require("./api/routes/menu/statistics");
app.use("/app/statistics", statisticsRoute);


/********** SETTINGS **********/

// Account Details route
var accountRoute = require("./api/routes/menu/account-details");
app.use("/app/account-details", accountRoute);

// Account rights route
var accountRightsRoute = require("./api/routes/menu/account-rights");
app.use("/app/account-rights", accountRightsRoute);

// Activity log route
var activityRoute = require("./api/routes/menu/activity");
app.use("/app/activity", activityRoute);

// Email Notification route
var emailNotifyRoute = require("./api/routes/menu/email-notify");
app.use("/app/email-notify", emailNotifyRoute);

// Api access route
var ApiAccessRoute = require("./api/routes/menu/api-access");
app.use("/app/api-access", ApiAccessRoute);

// Account linked route
var accountLinkedRoute = require("./api/routes/menu/account-linked");
app.use("/app/account-linked", accountLinkedRoute);

// Developer route
var developerRoute = require("./api/routes/menu/developer");
app.use("/app/developer", developerRoute);


/********** OTHERS **********/

// Alerts route
var alertsRoute = require("./api/routes/menu/alerts");
app.use("/app/alerts", alertsRoute);

// Announcements route
var announcementsRoute = require("./api/routes/menu/announcements");
app.use("/app/announcements", announcementsRoute);


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
  // res.render("./maintenance/404", { title: "Not found!" });
});

/******************** SERVER LISTENING ********************/
app.listen(port, err => {
  if (err) throw Error;
  else console.log("Server listening at port: " + port);
});
