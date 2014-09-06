/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    function RemainingTasksCtrl(ViewState, TaskService, AlertService, truncateLimit, $filter) {
        var vm = this;
        initializeViewState();
        TaskService.requestUpdateTimeTrackedForAllTasks();

        function initializeViewState() {
            vm.viewState = ViewState.remainingTaskViewState;
        }

        vm.dateFilter = function () {
            return $filter('24HourTime');
        };

        vm.getTasks = function () {
            return TaskService.getTasks();
        };

        vm.markComplete = function (task) {
            TaskService.markComplete(task);
            if (task.name != null) {
                if (task.name.length > truncateLimit) {
                    AlertService.setAlert('alert-success', 'Task Complete!', task.name.substr(0, truncateLimit) + '... has been marked as complete.', 2000);
                }
                else if (task.name.length <= truncateLimit) {
                    AlertService.setAlert('alert-success', 'Task Complete!', task.name + ' has been marked as complete.', 2000);
                }
            }
            else {
                AlertService.setAlert('alert-success', 'Task Complete!', 'A task has been marked as complete.', 2000);
            }
        };

        vm.prepareEditTask = function (task) {
            currentlyEditedTask = task;
            vm.inputCopy = angular.copy(currentlyEditedTask);
        };

        vm.editTask = function (taskFields) {
            currentlyEditedTask.name = taskFields.name;
            currentlyEditedTask.group = taskFields.group;
            vm.inputCopy = null;
            currentlyEditedTask = null;
        };

        vm.startTrackingTask = function (task) {
            TaskService.startTrackingTask(task);
        };

        vm.stopTrackingTask = function (task) {
            TaskService.stopTrackingTask(task);
        };
    }
    angular
        .module('ToDoList.TaskModule')
        .controller('RemainingTasksCtrl', ['ViewState', 'TaskService', 'AlertService', 'truncateLimit', '$filter', RemainingTasksCtrl]);
})();
