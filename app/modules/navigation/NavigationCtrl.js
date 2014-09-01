/**
 * @author: Joseph Gefroh
 */
(function() {
    function NavigationCtrl(TaskService, StatsService) {
        var vm = this;
        var TASK_STATISTICS_VIEW_ID = "STATS_VIEW";
        var TASK_COMPLETED_VIEW_ID = "COMPLETED_VIEW";
        var TASK_REMAINING_VIEW_ID = "REMAINING_VIEW";

        vm.currentView = TASK_REMAINING_VIEW_ID;

        vm.getTasks = function () {
            return TaskService.getTasks();
        };

        vm.showStats = function () {
            StatsService.requestStatUpdate();
            vm.currentView = TASK_STATISTICS_VIEW_ID;
        };

        vm.showTasksCompleted = function () {
            vm.currentView = TASK_COMPLETED_VIEW_ID;
        };

        vm.showTasksRemaining = function () {
            vm.currentView = TASK_REMAINING_VIEW_ID;
        };
    }

    angular
        .module('ToDoList.NavigationModule')
        .controller('NavigationCtrl', ['TaskService', 'StatsService', NavigationCtrl]);

})();