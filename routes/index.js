var express = require('express');
var router = express.Router();


// Twitter Keys (I know its bad practice to show keys)
var Twit = require('twit');
var T = new Twit({
    consumer_key: 'ibY8xUPyG7qiLCEqwv8hVtl82',
    consumer_secret: 'dCJf9AMD3QzdDf0udKyA0EA7KhIhg7j839Eyfn8uqwA66DNVx7',
    access_token: '2369630722-Xa3lvT3CcASbf7Tcn0vSabTYE8chSRMvtecu0O2',
    access_token_secret: 'Ic4Uc4k0hVn8MgT2Yxt7rK19SlZDIxBHBKuibOZCc5Bgm',
    timeout_ms: 60 * 1000,
});

/* GET index page. */
router.get('/', function(req, res, next) {

    // IP Address Location API with HTTPrequest
    var http = require('http');
    var ipPath = '/ip/' + req.query.ip + '/json';
    var Cords = {};

    var options = {
        host: 'geo.groupkt.com',
        path: ipPath
    };

    callback = function(response) {
        var locationResponse = '';
        response.on('data', function(chunk) {
            // Chunk is a string of data
            locationResponse += chunk;
            jsonResponse = JSON.parse(locationResponse);
            Cords.lat = jsonResponse.RestResponse.result.latitude;
            Cords.lon = jsonResponse.RestResponse.result.longitude;
        });
        response.on('end', function() {
            var q = req.query.q;
            var geocodeParams = Cords.lat + "," + Cords.lon + "," + "50mi";

            // Function to GET tweets
            function getTweets(q, geocode) {
                T.get('search/tweets', {
                    q: q,
                    result_type: 'recent',
                    geocode: geocode,
                    count: '25'
                }, function(err, tweets, response) {

                    res.render('index', {
                        title: 'ConnXus Test',
                        tweets: tweets.statuses,
                    });
                });
            }
            // How tweets will be displayed on web page
            if (q === undefined && Cords.lat === undefined) {
                getTweets('javascript', '39.333087,-84.315180,50mi');
            } else if (typeof Cords.lat === "string" || typeof Cords.lon == "string" && q === undefined) {
                getTweets('#', geocodeParams);
            } else {
                getTweets(q, geocodeParams);
            }
        });
    };
    http.request(options, callback).end();
});

module.exports = router;
