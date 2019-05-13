var db = require("../../../../Desktop/Project2-Team4/models");
var express = require("express");
var router = express.Router();
//POST USER DATA TO DATABASE - Not tested
//TODO TEST
router.post("/api/survey", function(req, res) {
    db.Users.create(req.body).then(function(res) {
      res.json(res);
    });
  });
