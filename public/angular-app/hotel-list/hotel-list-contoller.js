angular.module('hotelca').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    let vm = this;
    vm.title = 'HOTELCA';
    hotelDataFactory.hotelList().then(function(response) {
        vm.hotels = response;
    });

}

function imageNum() {
    // let array = [];
    // for (let n = 1; n <= vm.hotels.length; n++) {
    //     array.push(n);
    // }
    // vm.imageNum = array;

}