/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    var $jQuery = jQuery.noConflict();
    function RemainingTasksCtrl(ViewState, UserService, $stateParams, TaskService, AlertService, truncateLimit, $filter, $rootScope) {
        var vm = this;
        var ENTER_KEY_ID = 13;

        vm.getTasks = function () {
            TaskService.getTasksFor(UserService.user.id).then(function(tasks) {
                vm.tasks = tasks;
            });
        };

        vm.markComplete = function (task) {
            TaskService.markComplete(task);
            if (task.name != null) {
                AlertService.setAlert('alert-success', 'Task Complete!', $filter('limitTo')(task.name, truncateLimit) + ' has been marked as complete.', 2000);
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

        vm.addTask = function(taskFields) {
            if (taskFields) {
                TaskService.createTask(taskFields).then(function(task) {
                    vm.tasks.push(task);
                });
                resetInputFields(taskFields);
            }
        };

        vm.addTaskOnEnterKeyPressed = function(taskFields, key) {
            if (key.which === ENTER_KEY_ID) {
                vm.addTask(taskFields);
            }
        };

        function resetInputFields(taskFields) {
            taskFields.name = null;
            taskFields.group = null;
        }

        function initialize() {
            UserService.reserveID($stateParams.userID);
            initializeViewState();
            initializeModalWatcher();
            vm.getTasks();
        }

        function initializeViewState() {
            vm.viewState = ViewState.remainingTaskViewState;
        }

        function initializeModalWatcher() {
            $rootScope.$on('$locationChangeStart', function(next, current) {
                var modalBackdrop = $jQuery('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.remove();
                }
            });
        }

        initialize();

    }
    angular
        .module('ToDoList.TaskModule')
        .controller('RemainingTasksCtrl', ['ViewState', 'UserService', '$stateParams',  'TaskService', 'AlertService', 'truncateLimit', '$filter', '$rootScope',  RemainingTasksCtrl]);
})();
