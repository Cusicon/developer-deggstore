const express = require("express");
const router = express();
const title = "Publish";

/******************** MODELS ********************/
const App = require("../../models/application");

/********** DRAFT APPS **********/
var draftRouter = require("./draft");
router.use("/draft", draftRouter);

/******************** EXISTING APPS ROUTES ********************/

router.get("/:id", (req, res) => {
  var id = req.params.id;
  App.getAppById(id, (err, app) => {
    if (err) console.log(err);
    else {
      if (app.status != "published") {
        // Redirect to Draft Routes Handlers
        res.redirect("/app/publish/draft/" + id);
      } else {
        res.render("./menu/publish", { title: title, app: app });
      }
    }
  });
});

module.exports = router;
