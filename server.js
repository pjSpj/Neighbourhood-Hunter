
const express = require('express'),
app = express(),
passport = require('passport'),
session = require('express-session'),
bodyParser=require('body-parser'),
env = require('dotenv').config({path:__dirname+'/.env'}),
exphbs = require('express-handlebars'),
db = require("./models"),
PORT = process.env.PORT || 3006;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret:"neighbourhood",
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(process.cwd() + "/public"));//from line71

app.set('views','./views')
app.engine('hbs',exphbs({
    extname:'.hbs'
}))
app.set('view engine','.hbs')

app.get('/',function(req,res){
    res.render('home')
})

const models = require('./models')

const authRoute = require('./routes/auth.js')(app,passport)
require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function(){
    console.log('Database working')
}).catch(function(err){
    console.log(err,"sth were wrong")
})

// app.listen(PORT,function(err){
//     if(!err){
//         console.log('app listening on port '+PORT)
//     }else{
//         console.log(err)
//     }
// })
// *********************************************************************
// SERVER
// *********************************************************************

//REQUIRE
//======================================================================
//require("dotenv").config();

// const express = require('express');
// const bodyParser = require("body-parser");
// const exphbs = require("express-handlebars");

//const db = require("./models")

// const app = express();
//const PORT = process.env.PORT || 3006;

//Set up static files using express
//app.use(express.static(process.cwd() + "/public"));

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//Set handlebars as engine
//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//app.set("view engine", "handlebars");

//Require Routes
var routes = require("./routes/html-routes");

app.use(routes);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost: " + PORT);
  });
});

