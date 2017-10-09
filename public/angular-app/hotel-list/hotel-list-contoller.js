angular.module('hotelca').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    let vm = this;
    vm.title = 'HOTELCA';
    hotelDataFactory.hotelList().then(function(response) {
        vm.hotels = response;
    });

}
