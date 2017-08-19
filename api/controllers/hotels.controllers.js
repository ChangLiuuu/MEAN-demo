var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {

    console.log('GET the hotels');

    var db = dbconn.get();
    var collection = db.collection('hotel');

    // var docs = collection.find();  //return a cursor
    // docs.toArray(function(err, docs) {
    //     console.log('Found hotels', docs);
    //     res
    //         .status(200)
    //         .json(docs);
    // });

    var offset = 0;
    var count = 5;

    /*
     * url 输入 offset 和 count 来选择输出的数据
     * */
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function(err, docs) {
            console.log('Found hotels', docs);
            res
                .status(200)
                .json(docs);
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
    var db = dbconn.get();
    var collection = db.collection('hotel');
    var hotelId = req.params.hotelId;
    console.log('GET hotelId', hotelId);

    collection
        .findOne({
            _id : ObjectId(hotelId)
        }, function(err, doc) {
            res
                .status(200)
                .json(doc);
               // .json(hotelData[req.params.hotelId]);
        });


};

module.exports.hotelsAddOne = function(req, res) {
    console.log("POST new hotel");
    var db = dbconn.get();
    var collection = db.collection('hotel');
    var newHotel;

    if (req.body && req.body.name && req.body.stars) { //postman测试
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        console.log(newHotel);
        res
            .status(200)
            .json(req.body);
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
