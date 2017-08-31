/**
 * Created by liuchang on 8/30/17.
 */
angular.module('hotelca').directive('hotelRating', hotelRating);

function hotelRating() {
    return {
        restrict: 'E',
        template: '<span ng-repeat="star in vm.stars" class="glyphicon-star">{{ star }}</span>',
        bindToController : true,
        controller: 'HotelController',
        controllerAs: 'vm',
        scope: {
            stars: '@'
        }
    }
}