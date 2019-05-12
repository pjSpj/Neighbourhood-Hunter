const express = require('express'),
app = express(),
passport = require('passport'),
session = require('express-session'),
bodyParser=require('body-parser'),
env = require('dotenv').config({path:__dirname+'/.env'}),
exphbs = require('express-handlebars')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret:"neighbourhood",
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('views','./app/views')
app.engine('hbs',exphbs({
    extname:'.hbs'
}))
app.set('view engine','.hbs')

app.get('/',function(req,res){
    res.render('home')
})

const models = require('./app/models')

const authRoute = require('./app/routes/auth.js')(app,passport)
require('./app/config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function(){
    console.log('Database working')
}).catch(function(err){
    console.log(err,"sth were wrong")
})

app.listen(3006,function(err){
    if(!err){
        console.log('app listening on port 3000')
    }else{
        console.log(err)
    }
})