// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;

// var hotelData = require('../data/hotel-data.json');

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // A geoJSON point
    var point = {
        type : "Point",
        coordinates : [lng, lat]
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Hotel
        .geoNear(point, geoOptions, function(err, results, stats) {
            console.log("Geo results", results);
            console.log("Geo stats", stats);
            res
                .status(200)
                .json(results);
        });
};

module.exports.hotelsGetAll = function(req, res) {

    console.log('GET the hotels');

    // var db = dbconn.get();
    // var collection = db.collection('hotels');

    // var docs = collection.find();  //return a cursor
    // docs.toArray(function(err, docs) {
    //     console.log('Found hotels', docs);
    //     res
    //         .status(200)
    //         .json(docs);
    // });

    var offset = 0;
    var count = 5;
    var maxCount = 10;


    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    /*
     * url 输入 offset 和 count 来选择输出的数据
     * */
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) { //error checking
        res
            .status(400)
            .json({
                "message" : "querystring count and offset should be numbers."
            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message" : "Count limit of" + maxCount + "exceeded."
            })
    }

    // collection
    //     .find()
    //     .skip(offset)
    //     .limit(count)
    //     .toArray(function(err, docs) {
    //         console.log('Found hotels', docs);
    //         res
    //             .status(200)
    //             .json(docs);
    //     });
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found hotels", hotels.length);
                res
                    .json(hotels);
            }

        });

};
/*
 console.log('db', db);

 console.log('------');


 console.log(req.query);

 var returnData;
 var offset = 0;
 var count = 5;

 if (req.query && req.query.offset) {
 offset = parseInt(req.query.offset, 10);
 }

 if (req.query && req.query.count) {
 count = parseInt(req.query.count, 10);
 }

 returnData = hotelData.slice(offset, offset + count);

 res
 .status(200)
 .json(returnData);
 };
 */

module.exports.hotelsGetOne = function(req, res) {
    console.log('GET hotelId', req.params.hotelId);
    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    var hotelId = req.params.hotelId;
    console.log('GET hotelId', hotelId);

    // collection
    //     .findOne({
    //         _id : ObjectId(hotelId)
    //     }, function(err, doc) {
    //         res
    //             .status(200)
    //             .json(doc);
    //         // .json(hotelData[req.params.hotelId]);
    //     });
    Hotel
        .findById(hotelId)
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);


        });


};

module.exports.hotelsAddOne = function(req, res) {
    console.log("POST new hotel.");
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;

    if (req.body && req.body.name && req.body.stars) { //postman测试
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        console.log(newHotel);
        collection
            .insertOne(newHotel, function(err, response) {
                console.log(response, '-----');
                console.log(response.ops);
                res
                    .status(201)
                    // .json(req.body);
                    .json(response.ops);
            });

    } else {
        console.log("Data missing from body");
        res
            .status(400)
            .json({message : "Required data missing from body"});
    }

    // console.log(req.body);
    // res
    //     .status(200)
    //     .json(req.body);
};
