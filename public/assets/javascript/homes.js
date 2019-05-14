/* eslint-disable no-console */
const kijiji = require("kijiji-scraper");

// var express = require('express');
// var app = express();
// var PORT = 3000;
// const router = require("express").Router()

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.get("/api/scrape/:location/:category", function (req, res) {
    let options = {
        minResults: 1,
        maxResults: 1
    };

    let params = {
        locationId: 1700273, 
        categoryId: 34,
    };

    kijiji.search(params, options).then(function (ads) {
        var results = []

        for (let i = 0; i < ads.length; ++i) {
            // console.log(ads[i]);
            var obj = {
                title: ads[i].title,
                descrip: ads[i].description,
                price: ads[i].attributes.price,
                location: ads[i].attributes.location,
                url: ads[i].url
            }
            results.push(obj)
            console.log(obj)
        }
        // res.json(results);

    }).catch(console.error);
// })


