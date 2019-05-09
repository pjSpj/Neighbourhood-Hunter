const path = require("path")
var express = require("express")

var router = express.Router();

router.get("/",function (req,res){
    res.render("index")
})

router.get("/search",function (req,res){
    res.render("survey")
})

router.get("/result",function (req,res){
    res.render("results")

})

module.exports = router;
