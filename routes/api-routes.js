var express = require("express");
var router = express.Router();

// Routes

router.post("/api/newSurvey", function(req, res) {
    db.Survey.create(req.body).then(function(data) {
      res.json(data);
    });
    res.redirect("/result")
  });




module.exports = router;
