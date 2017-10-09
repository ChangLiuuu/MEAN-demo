angular.module('hotelca').controller('ProfileController', ProfileController);

function ProfileController($window, jwtHelper) {
    let vm = this;
    vm.getName = function() {
        let token = jwtHelper.decodeToken($window.sessionStorage.token);
        return token.username;
    }
}