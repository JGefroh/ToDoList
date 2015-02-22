/**
 * Created by Joseph on 8/16/2014.
 */
(function() {
    function TaskService($http, $timeout, $stateParams, UserService) {
        var taskList = [];

        var endpoints = {
            getTasks: function(ownerID) {
                return '../rest/tasks?ownerID={ownerID}'.replace('{ownerID}', ownerID);
            }
        };
        var TRACKING_UPDATE_INTERVAL_IN_MS = 30000;
        startTrackingUpdateRepeatingTimer();

        function startTrackingUpdateRepeatingTimer() {
            var trackingUpdateTimer = $timeout(function () {
                updateTimeTrackedForAllTasks();
                startTrackingUpdateRepeatingTimer();
            }, TRACKING_UPDATE_INTERVAL_IN_MS);
        }

        function updateTimeTrackedForAllTasks() {
            for (var objectIndex = 0; objectIndex < taskList.length; objectIndex++) {
                var task = taskList[objectIndex];
                task.bankTimeTracked();
            }
        }


        this.createTask = function (task) {
            if (isValidInput(task.name, task.group)) {
                var createdTask = createTask(task.name, task.group);
                taskList.unshift(createdTask);
            }
        };

        function isValidInput(taskName, taskGroup) {
            return taskName || taskGroup;
        }

        function createTask(taskName, taskGroup) {
            var taskToCreate = new Task();
            taskToCreate.name = taskName;
            taskToCreate.group = taskGroup;
            return taskToCreate;
        }


        this.getTasksFor = function (ownerID) {
            return $http.get(endpoints.getTasks(ownerID)).then(function(response) {
                return response.data;
            })
        };

        this.setTasks = function(tasks) {
            taskList.length = 0;
            angular.forEach(tasks, function(value, key) {
                var newTask = new Task();
                newTask.group = value.group;
                newTask.name = value.name;
                newTask.dateAdded = new Date(value.dateAdded);
                newTask.dateCompleted = new Date(value.dateCompleted);
                newTask.isCompleted = value.isCompleted;
                newTask.isTracking = value.isTracking;
                newTask.timeTrackingStarted = new Date();
                newTask.totalTimeTracked = value.totalTimeTracked;
                taskList.unshift(newTask);
            });
        };


        this.markComplete = function (task) {
            task.markComplete();
        };

        this.markTaskIncomplete = function (task) {
            task.markIncomplete();
        };


        this.requestUpdateTimeTrackedForAllTasks = function () {
            updateTimeTrackedForAllTasks();
        };

        this.startTrackingTask = function (task) {
            task.startTracking();
        };

        this.stopTrackingTask = function (task) {
            task.stopTracking();
        };
    }
    angular
        .module('ToDoList.TaskModule')
        .service('TaskService', ['$http', '$timeout', '$stateParams', 'UserService', TaskService]);
})();