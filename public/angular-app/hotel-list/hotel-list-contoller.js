angular.module('hotelca').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = 'Hotel App';
    hotelDataFactory.hotelList().then(function(response) {
        console.log(response);
        vm.hotels = response;
    });
}