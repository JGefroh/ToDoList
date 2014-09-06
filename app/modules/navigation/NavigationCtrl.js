/**
 * @author: Joseph Gefroh
 */
(function() {
    function NavigationCtrl(TaskService, StatsService, $location) {
        var vm = this;
        vm.getTasks = function () {
            return TaskService.getTasks();
        };

        vm.goTo = function(route) {
            $location.path(route);
        };

        vm.requestStatUpdate = function () {
            StatsService.requestStatUpdate();
        };
    }

    angular
        .module('ToDoList.NavigationModule')
        .controller('NavigationCtrl', ['TaskService', 'StatsService', '$location', NavigationCtrl]);

})();