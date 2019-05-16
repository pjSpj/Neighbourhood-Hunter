
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
app.use(express.static('public'));

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
    res.render('index',{
        style:"./css/style.css"
    })
})

app.get('/survey',function(req,res){
    res.render('survey')
})

/**Subscribe function */
app.get('/mail',function(req,res){
    res.render('mail')
})

app.post('/mail',function(req,res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName    
                }
            }
        ]
    }

   let jsonData = JSON.stringify(data)
    // console.log(firstName,lastName,email)

    let options = {
        url:"https://us20.api.mailchimp.com/3.0/lists/2e7eff00af",
        method:"POST",
        headers:{
            "Authorization":"pj aee8b234f5ce4d931bc392506fbd346f-us20"
        },
        body:jsonData
    }


    request(options,function(err,response,body){
        if(err){
            //console.log(err)
            res.render("failure")
        }else{
            if(response.statusCode ===200){
                res.render("success")
            }else(
                res.render("failure")
            )
        }
    })
})

app.post('/failure',function(req,res){
    res.redirect('/mail')
})

app.post('/success',function(req,res){
    res.redirect('/result')
})


const models = require('./models')

const authRoute = require('./routes/auth.js')(app,passport)
require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function(){
    console.log('Database working')
}).catch(function(err){
    console.log(err,"sth were wrong")
})


//Require Routes
var routes = require("./routes/html-routes");
var apiRoutes = require("./routes/api-routes");

app.use(routes);
app.use(apiRoutes);



db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost: " + PORT);
  });
});

