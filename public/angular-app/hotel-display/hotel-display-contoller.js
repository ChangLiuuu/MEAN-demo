angular.module('hotelca').controller('HotelController', HotelController);

function HotelController($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    console.log('id',id);
    vm.title = 'Hotel Information';
    $http.get('/api/hotels/' + id).then(function(response) {
        vm.hotel = response.data;
    });
}