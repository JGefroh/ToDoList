/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function SplashCtrl( $stateParams, UserService) {
        var vm = this;
        vm.user = UserService.user;
        function initialize() {
            UserService.reserveID($stateParams.userID);
        }

        initialize();
    }
    angular
        .module('ToDoList.StatsModule')
        .controller('SplashCtrl', ['$stateParams', 'UserService', SplashCtrl]);
})();