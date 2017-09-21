angular.module('hotelca').controller('HotelController', HotelController);

function HotelController($route, $routeParams, hotelDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;
    console.log('hotel id', id);
    hotelDataFactory.hotelDisplay(id).then(function(response) {
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
    });

    function _getStarRating(stars) {
        return new Array(stars);
    }

    vm.addReview = function() {

        var postData = {
            name : vm.name,
            rating : vm.rating,
            review : vm.review
        };

        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response) {
                $route.reload();
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
}