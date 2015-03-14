/**
 * @author: Joseph Gefroh
 */
(function() {
    function NavigationCtrl(TaskService, StatsService, $location, applicationName, versionNumber, UserService) {
        var vm = this;
        vm.user = UserService.user;
        vm.applicationName = applicationName;
        vm.versionNumber = versionNumber;

        vm.getTasks = function () {
            TaskService.getTasks(UserService.user.id).then(function(tasks) {
                vm.tasks = tasks;
            });
        };

        vm.goTo = function(route) {
            $location.path(route);
        };

        vm.requestStatUpdate = function () {
            StatsService.requestStatUpdate();
        };

        vm.isActive = function(route) {
            return $location.path() === route || $location.path().indexOf(route) === 0;
        };
    }

    angular
        .module('ToDoList.NavigationModule', [])
        .controller('NavigationCtrl', ['TaskService', 'StatsService', '$location', 'applicationName', 'versionNumber', 'UserService', NavigationCtrl]);

})();