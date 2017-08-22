var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers');
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne);

router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne); //不能用url测试了 需要postman

router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll);

router
    .route('/hotels/:hotelId/reviews/:reivewId')
    .get(ctrlReviews.reviewsGetOne);



module.exports = router;