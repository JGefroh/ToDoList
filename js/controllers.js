/**
 * Created by Joseph on 8/16/2014.
 */
var toDoListApp = angular.module('ToDoListApp', []);

toDoListApp.controller('ToDoListController', function ($scope) {
    $scope.TABLE_TASKS_REMAINING = "tasksRemainingView";
    $scope.TABLE_TASKS_COMPLETED = "tasksCompletedView";
    $scope.currentTable = $scope.TABLE_TASKS_REMAINING;
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

        task.dateCompleted = new Date();

        $scope.tasks.splice(indexOfTask, 1);
        $scope.tasksFinished.push(task);
    }

    $scope.editTask = function(task) {
        $scope.editedTaskCopy = angular.copy(task);
        $scope.editedTask = task;
    }

    $scope.commitTaskChanges = function(task) {
        $scope.editedTask.name = $scope.editedTaskCopy.name;
    }

    $scope.toggleHighlight = function(task) {
        if (task.isHighlighted === true) {
            task.isHighlighted = false;
        }
        else {
            task.isHighlighted = true;
        }
    }

    $scope.formatDate = function (dateToConvert) {
        return dateToConvert.getMonth() + 1 + "/" + dateToConvert.getDate() + "/"
            + dateToConvert.getUTCFullYear() + " - " +dateToConvert.getHours() + ":" + (dateToConvert.getMinutes() < 10 ? "0" + dateToConvert.getMinutes(): dateToConvert.getMinutes());
    }

    $scope.getDifferenceInHours = function (dateOne, dateTwo) {
        var timeDifference = Math.abs(dateOne.getTime() - dateTwo.getTime());
        return (Math.round(timeDifference / 60000) / 60).toFixed(2);
    }

    $scope.showTasksRemaining = function() {
        $scope.currentTable = $scope.TABLE_TASKS_REMAINING;

    }

    $scope.showTasksCompleted = function() {
        $scope.currentTable = $scope.TABLE_TASKS_COMPLETED;
    }
});