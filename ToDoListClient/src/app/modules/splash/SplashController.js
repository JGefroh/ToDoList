/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function SplashCtrl($state, UserService) {
        var vm = this;
        vm.user = UserService.user;
        vm.params = $state.params;

        vm.goTo = function(route, data) {
            $state.go(route, data);
        };

        vm.useId = function(userID) {
            UserService.reserveID(userID).then(function(id) {
                vm.goTo('remaining', {userID: id});
            });
        };

        function initialize() {
            UserService.reserveID($state.params.userID).then(function(id) {
                vm.input = {
                    id: id
                };
            });
        }

        initialize();
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('SplashCtrl', ['$state', 'UserService', SplashCtrl]);
})();