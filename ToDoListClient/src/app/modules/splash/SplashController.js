/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function SplashCtrl($window, $stateParams, $location, UserService) {
        var vm = this;
        vm.user = UserService.user;

        vm.goTo = function(route) {
            $location.path(route);
        };

        function initialize() {
            UserService.reserveID($stateParams.userID);
        }

        initialize();
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('SplashCtrl', ['$window', '$stateParams', '$location', 'UserService', SplashCtrl]);
})();