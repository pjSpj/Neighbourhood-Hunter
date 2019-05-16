var express = require("express");
var router = express.Router();

// Routes

router.post("/api/newSurvey", function(req, res) {
  // This is where the Database Storage would happen

  res.redirect("/result")
});

module.exports = router;
