/**
 * Created by liuchang on 9/21/17.
 */
angular.module('hotelca').directive('mNavigation', mNavigation);
function mNavigation() {
    return {
        restrict : 'E',
        templateUrl : 'angular-app/navigation-directive/navigation-directive.html'

    };
}