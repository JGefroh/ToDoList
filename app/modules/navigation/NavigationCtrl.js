/**
 * @author: Joseph Gefroh
 */
var taskModule = angular.module('ToDoList.NavigationModule');
taskModule.controller('NavigationCtrl', function($scope, TaskService, StatsService) {

    var TASK_STATISTICS_VIEW_ID = "STATS_VIEW";
    var TASK_COMPLETED_VIEW_ID = "COMPLETED_VIEW";
    var TASK_REMAINING_VIEW_ID = "REMAINING_VIEW";

    $scope.currentView = TASK_REMAINING_VIEW_ID;

    $scope.getTasks = function() {
        return TaskService.getTasks();
    };

    $scope.showStats = function() {
        StatsService.requestStatUpdate();
        $scope.currentView = TASK_STATISTICS_VIEW_ID;
    };

    $scope.showTasksCompleted = function() {
        $scope.currentView = TASK_COMPLETED_VIEW_ID;
    };

    $scope.showTasksRemaining = function() {
        $scope.currentView = TASK_REMAINING_VIEW_ID;
    };
});