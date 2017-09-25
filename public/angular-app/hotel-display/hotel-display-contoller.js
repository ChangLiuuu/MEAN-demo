angular.module('hotelca').controller('HotelController', HotelController);

function HotelController($route, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper) {
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

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            var token = jwtHelper.decodeToken($window.sessionStorage.token);
            var username = token.username;
            vm.username = username;
            return true;
        } else {
            return false;
        }
    }
    vm.addReview = function() {
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;
        var postData = {
            name : username,
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