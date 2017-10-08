/**
 * Created by liuchang on 9/23/17.
 */
angular.module('hotelca').controller('LoginController', LoginController);
function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
    let vm = this;

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            let token = $window.sessionStorage.token;
            let decodedToken = jwtHelper.decodeToken(token);
            vm.loggedInUser = decodedToken.username;
            return true;
        } else {
            return false;
        }
    };

    vm.login = function() {
        vm.error = false;
        if (vm.username && vm.password) {
            let user = {
                username : vm.username,
                password : vm.password
            };
            $http.post('/api/users/login', user).then(function(response) {
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    let token = $window.sessionStorage.token;
                    let decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
                }
            }).catch(function(err) {
                vm.error = true;
                console.log(err);
            })
        }
    };

    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    };
    vm.isActiveTab = function(url) {
        let currentPath = $location.path().split('/')[1];

        return (url === currentPath ? 'active' : '');
    }
}