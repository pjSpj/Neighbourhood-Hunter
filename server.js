// *********************************************************************
// SERVER
// *********************************************************************

//REQUIRE
//======================================================================
// require("dotenv").config();

const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

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

//TODO Force Sync
app.listen(PORT, function() {
    // eslint-disable-next-line no-console
    console.log("Server listening on: http://localhost:" + PORT);
  });