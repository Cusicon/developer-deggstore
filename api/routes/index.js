const express = require("express");
const router = express.Router();

/******************** MENU ROUTES ********************/

// Dashboard route
var dashboardRoute = require("./menu/dashboard");
router.use("/app", dashboardRoute);

// Game-services route
var gameServicesRoute = require("./menu/game-services");
router.use("/app/game-services", gameServicesRoute);

// Reports route
var reportsRoute = require("./menu/reports");
router.use("/app/reports", reportsRoute);

// Alerts route
var alertsRoute = require("./menu/alerts");
router.use("/app/alerts", alertsRoute);

/********** SETTINGS **********/

// Account Details route
var accountRoute = require("./menu/account-details");
router.use("/app/account-details", accountRoute);

// Account rights route
var accountRightsRoute = require("./menu/account-rights");
router.use("/app/account-rights", accountRightsRoute);

// Activity log route
var activityRoute = require("./menu/activity");
router.use("/app/activity", activityRoute);

// Email Notification route
var emailNotifyRoute = require("./menu/email-notify");
router.use("/app/email-notify", emailNotifyRoute);

// Api access route
var ApiAccessRoute = require("./menu/api-access");
router.use("/app/api-access", ApiAccessRoute);

// Account linked route
var accountLinkedRoute = require("./menu/account-linked");
router.use("/app/account-linked", accountLinkedRoute);

// Developer route
var developerRoute = require("./menu/developer_page");
router.use("/app/developer", developerRoute);

module.exports = router;
