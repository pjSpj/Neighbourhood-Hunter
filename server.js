// *********************************************************************
// SERVER
// *********************************************************************

//REQUIRE
//======================================================================
require("dotenv").config();

const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const db = require("./models")

const app = express();
const PORT = process.env.PORT || 3006;

//Set up static files using express
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set handlebars as engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Require Routes
var routes = require("./routes/html-routes");

app.use(routes);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost: " + PORT);
  });
});