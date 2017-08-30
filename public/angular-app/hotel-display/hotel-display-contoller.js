angular.module('hotelca').controller('HotelController', HotelController);

function HotelController($routeParams, hotelDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    console.log('id',id);
    vm.title = 'Hotel Information';
    hotelDataFactory.hotelDisplay(id).then(function(response) {
        vm.hotel = response;
    });
}