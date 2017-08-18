var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne); //不能用url测试了 需要postman

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);



module.exports = router;