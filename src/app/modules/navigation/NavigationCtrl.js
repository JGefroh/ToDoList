/**
 * @author: Joseph Gefroh
 */
(function() {
    function NavigationCtrl(TaskService, StatsService, $location, applicationName, versionNumber) {
        var vm = this;
        vm.applicationName = applicationName;
        vm.versionNumber = versionNumber;

        vm.getTasks = function () {
            return TaskService.getTasks();
        };

        vm.goTo = function(route) {
            $location.path(route);
        };

        vm.requestStatUpdate = function () {
            StatsService.requestStatUpdate();
        };

        vm.isActive = function(route) {
            return $location.path() === route;
        }
    }

    angular
        .module('ToDoList.NavigationModule', [])
        .controller('NavigationCtrl', ['TaskService', 'StatsService', '$location', 'applicationName', 'versionNumber', NavigationCtrl]);

})();