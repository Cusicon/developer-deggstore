const mongoose = require("mongoose");
const connectionUrl = process.env.MONGOLAB_URI || "mongodb://localhost/deggstore";

/********** DB CONNECTION **********/
mongoose.connect(connectionUrl); // after "localhost" your db's name follows
const db = mongoose.connection;

// Check for DB connection
db.once("open", () => {
	console.log("Connecting to MongoDB...");
	console.log("Connected to MongoDB -> Deggstore.\n");
});

// check for DB errors
db.on("error", err => {
	console.log(err);
});
