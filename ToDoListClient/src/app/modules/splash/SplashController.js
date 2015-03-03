/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function SplashCtrl($state, UserService) {
        var vm = this;
        vm.user = UserService.user;
        vm.params = $state.params;

        vm.goToRemaining = function() {
            $state.go('remaining', {userID: vm.params.userID});
        };

        vm.useId = function(userID) {
            UserService.reserveID(userID);
        };

        function initialize() {
            UserService.reserveID($state.params.userID);
        }

        initialize();
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('SplashCtrl', ['$state', 'UserService', SplashCtrl]);
})();