/**
 * Created by Joseph on 8/16/2014.
 */
var toDoListApp = angular.module('ToDoListApp', []);

toDoListApp.controller('ToDoListController', function ($scope) {
    $scope.tasks = [];
    $scope.tasksFinished = [];

    $scope.addTask = function (task) {
        if (typeof task === 'undefined') {
            return;
        }
        var newTask = angular.copy(task);
        newTask.dateAdded = new Date();
        $scope.tasks.push(newTask);
        $scope.task = undefined;
    };

    $scope.removeTask = function(task) {
        var indexOfTask = $scope.tasks.indexOf(task);
        if (indexOfTask < 0) {
            return;
        }

        $scope.tasks.splice(indexOfTask, 1);
        $scope.tasksFinished.push(task);
    }
});