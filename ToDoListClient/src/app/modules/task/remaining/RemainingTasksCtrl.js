/**
 * Created by Joseph on 8/25/2014.
 */
(function() {
    var $jQuery = jQuery.noConflict();
    function RemainingTasksCtrl(ViewState, UserService, $stateParams, TaskService, AlertService, truncateLimit, $filter, $rootScope) {
        var vm = this;
        var ENTER_KEY_ID = 13;
        vm.operations = {
            addTask: {
                status: null
            },
            getTasks: {
                status: null
            },
            editTask: {
                status: null
            }
        };

        vm.getTasks = function () {
            vm.operations.getTasks.status = 'LOADING';
            TaskService.getTasksFor(UserService.user.id).then(function(tasks) {
                vm.operations.getTasks.status = null;
                vm.tasks = tasks;
            })
            .catch(function(error) {
                vm.operations.getTasks.status = 'ERROR';
                console.error("An error occured while loading tasks.");
            });
        };

        vm.addTask = function(taskFields) {
            vm.operations.addTask.status = 'LOADING';
            TaskService.saveTask(UserService.user.id, taskFields).then(function(task) {
                vm.operations.addTask.status = null;
                vm.tasks.push(task);
                resetInputFields(taskFields);
            })
            .catch(function(error) {
                vm.operations.addTask.status = 'ERROR';
                console.error("An error occured while adding task.");
            });
        };

        vm.markComplete = function (task) {
            TaskService.markComplete(UserService.user.id, task.id).then(function(completedTask) {
                angular.copy(completedTask, task);
                if (task.name != null) {
                    AlertService.setAlert('alert-success', 'Task Complete!', $filter('limitTo')(task.name, truncateLimit) + ' has been marked as complete.', 2000);
                }
                else {
                    AlertService.setAlert('alert-success', 'Task Complete!', 'A task has been marked as complete.', 2000);
                }
            })
            .catch(function() {
                console.error("An error occurred while completing task.");
            });
        };

        vm.prepareEditTask = function (task) {
            currentlyEditedTask = task;
            vm.inputCopy = angular.copy(currentlyEditedTask);
        };

        vm.editTask = function (taskFields) {
            vm.operations.editTask.status = 'LOADING';
            TaskService.saveTask(UserService.user.id, taskFields).then(function(savedTask) {
                vm.operations.editTask.status = null;
                angular.copy(savedTask, currentlyEditedTask);
                vm.inputCopy = null;
                currentlyEditedTask = null;
                $jQuery("#editTaskView").modal("hide");
            })
            .catch(function(error) {
                vm.operations.editTask.status = 'ERROR';
                console.error('An error occurred while saving a task.');
            });
        };

        vm.startTrackingTask = function (task) {
            task.isReadOnly = true;
            TaskService.trackTask(UserService.user.id, task.id).then(function(trackedTask) {
                angular.copy(trackedTask, task);
            })
            .finally(function() {
                task.isReadOnly = false;
            });
        };

        vm.stopTrackingTask = function (task) {
            task.isReadOnly = true;
            TaskService.untrackTask(UserService.user.id, task.id).then(function(untrackedTask) {
                angular.copy(untrackedTask, task);
            })
            .finally(function() {
                task.isReadOnly = false;
            });
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
