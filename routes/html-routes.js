var express = require("express");
var axios = require("axios");

var router = express.Router();

router.get("/",function (req,res){
    res.render("index");
})

router.get("/search",function (req,res){
    res.render("survey");
})

router.get("/result",function (req,res){
    res.render("results");

})

router.get("/details",function (req,res){

    // receive an address in the body, for now its defaulted to myhal instead
    var query = "55 Saint George Street Toronto"
    query = query.replace(/\s/g, '%20');
    // req.body.address;
    // query = query.replace(/\s/g, '');

    // geocode the address to receive the positional coordinates 
    var searchurl = "https://api.tomtom.com/search/2/geocode/"+ query +".json?countrySet=CA&key=" + process.env.TOMTOM_KEY;
    axios.get(searchurl).then(
        function(searchres) {
            var coord = searchres.data.results[0].position;

            // generate the link using the coordinates for the map image
            var mapurl = "https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&zoom=17&center=" + coord.lon +"%2C%20" + coord.lat +"&width=512&height=512&view=Unified&key=" + process.env.TOMTOM_KEY;
            
            // Search the nearby area for buildings under a nearby keyword
            // var nearbyurl = "https://api.tomtom.com/search/2/search/"+ req.body.keyword + ".json?limit=5&countrySet=CA&lat="+ coord.lat +"&lon="+ coord.lon +"&radius=250&idxSet=POI&key=" + process.env.TOMTOM_KEY;
            var nearbyurl = "https://api.tomtom.com/search/2/search/"+ "coffee" + ".json?limit=5&countrySet=CA&lat="+ coord.lat +"&lon="+ coord.lon +"&radius=250&idxSet=POI&key=" + process.env.TOMTOM_KEY;

            axios.get(nearbyurl).then(
                function(nearbyres) {

                    // render the details handlebars page with the given information
                    // res.render("details", { mapurl:mapurl, tomres:nearbyres });
                    console.log({ mapurl:mapurl, tomres:nearbyres.data });
                    res.redirect(mapurl);
                }

            )
        }
    )
})

module.exports = router;
