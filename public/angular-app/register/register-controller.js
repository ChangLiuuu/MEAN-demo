/**
 * Created by liuchang on 9/21/17.
 */
angular.module('hotelca').controller('RegisterController', RegisterController);

function RegisterController($http) {
    vm = this;
    vm.register = function() {
        let user = {
            username : vm.username,
            password : vm.password
        };
        if (!vm.username || !vm.password) {
            vm.error = 'Please add a username and a password.';
        } else {
            if (vm.password !== vm.passwordRepeat) {
                vm.error = "Passwords do not match.";
            } else {
                $http.post('/api/users/register', user).then(function(result) {
                    console.log(result);
                    vm.message = 'Successful registration, please login.';
                    vm.error = '';
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
}