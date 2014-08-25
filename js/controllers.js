/**
 * Created by Joseph on 8/16/2014.
 */
var toDoListApp = angular.module('ToDoListApp', []);
toDoListApp.controller('ToDoListController', function ($scope, $timeout) {

    $scope.TABLE_TASKS_REMAINING = "tasksRemainingView";
    $scope.TABLE_TASKS_COMPLETED = "tasksCompletedView";
    $scope.currentTable = $scope.TABLE_TASKS_REMAINING;
    $scope.tasks = [];
    $scope.tasksFinished = [];

    initializePageLeaveWarning();
    updateTimeTracked();
    var timesUpdated = 0;

    function initializePageLeaveWarning() {
        window.onbeforeunload = function() {
            return 'Are you sure you want to leave this page? Your tasks will not be saved.';
        };
    }

    function updateTimeTracked() {
        timesUpdated++;
        for (var objectIndex = 0; objectIndex < $scope.tasks.length; objectIndex++) {
            var task = $scope.tasks[objectIndex];
            if (task.isTracking === true) {
                stopTracking(task);
                startTracking(task);
            }
        }

        var trackingUpdateTimer = $timeout(function () {
            $timeout.cancel(trackingUpdateTimer);
            updateTimeTracked();
        }, 30000);
    }

    $scope.addTask = function (task) {
        if (typeof task === 'undefined') {
            return;
        }
        var newTask = angular.copy(task);
        newTask.dateAdded = new Date();
        newTask.totalTimeTaken = 0;
        newTask.isHidden = true;
        $scope.tasks.push(newTask);
        $timeout(function () {
            newTask.isHidden = false;
        }, 20);
        $scope.task = undefined;
    };

    $scope.finishTask = function(task) {
        var indexOfTask = $scope.tasks.indexOf(task);
        if (indexOfTask < 0) {
            return;
        }
        task.dateCompleted = new Date();
        task.isHidden = true;
        stopTracking(task);
        $timeout(function () {
            if ($scope.tasksFinished.indexOf(task) != -1) {
                return;
            }
            $scope.tasks.splice(indexOfTask, 1);
            $scope.tasksFinished.push(task);
        }, 250);

    }

    $scope.editTask = function(task) {
        $scope.editedTaskCopy = angular.copy(task);
        $scope.editedTask = task;
    }

    $scope.commitTaskChanges = function(task) {
        $scope.editedTask.name = $scope.editedTaskCopy.name;
    }

    $scope.toggleTracking = function(task) {
        if (task.isTracking === true) {
            stopTracking(task);
        }
        else {
            startTracking(task);
        }
    }

    function startTracking(task) {
        task.timeTrackingStarted = new Date();
        task.isTracking = true;
    }

    function stopTracking(task) {
        if (typeof task.timeTrackingStarted === 'undefined') {
            return;
        }
        task.totalTimeTaken += $scope.getDifferenceInMS(task.timeTrackingStarted, new Date());
        task.timeTrackingStarted = undefined;
        task.isTracking = false;
    }

    $scope.formatDate = function (dateToConvert) {
        return dateToConvert.getHours() + ":" + (dateToConvert.getMinutes() < 10 ? "0" + dateToConvert.getMinutes(): dateToConvert.getMinutes());
    }

    $scope.getDifferenceInMS = function (dateOne, dateTwo) {
        var timeDifference = Math.abs(dateOne.getTime() - dateTwo.getTime());
        return timeDifference;
    }

    $scope.showTasksRemaining = function() {
        $scope.currentTable = $scope.TABLE_TASKS_REMAINING;

    }

    $scope.showTasksCompleted = function() {
        $scope.currentTable = $scope.TABLE_TASKS_COMPLETED;
    }

    $scope.convertMSToHours = function(time) {
        return (Math.round(time / 60000) / 60);
    }
});