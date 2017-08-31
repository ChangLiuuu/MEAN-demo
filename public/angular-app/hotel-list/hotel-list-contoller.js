angular.module('hotelca').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = 'HOTELCA';
    hotelDataFactory.hotelList().then(function(response) {
        console.log(response);
        vm.hotels = response;
    });
}